import { NextResponse } from 'next/server';
import { dispatchJoinApplication } from '@/lib/email';
import { adminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, city, interest, message, howHeard } = body;

    if (!fullName || !email || !city || !interest) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, city, and interest are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // Save to Firestore — join_applications collection
    await adminDb.collection('join_applications').add({
      fullName:  fullName.trim(),
      email:     email.trim(),
      phone:     phone?.trim() || '',
      city:      city.trim(),
      interest:  interest.trim(),
      message:   message?.trim() || '',
      howHeard:  howHeard?.trim() || 'Website',
      createdAt: Timestamp.now(),
      status:    'pending',
    });

    // Dispatch professional application dossier to valkyrriemeds@gmail.com and candidate
    await dispatchJoinApplication({
      fullName: fullName.trim(),
      email:    email.trim(),
      phone:    phone?.trim() || '',
      city:     city.trim(),
      interest: interest.trim(),
      message:  message?.trim() || '',
      howHeard: howHeard?.trim() || 'Website',
    });

    return NextResponse.json({
      success: true,
      message: `Your application has been received! We have notified our admissions team at valkyrriemeds@gmail.com and dispatched a confirmation to ${email}.`,
    });
  } catch (error) {
    console.error('Error handling join application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    );
  }
}
