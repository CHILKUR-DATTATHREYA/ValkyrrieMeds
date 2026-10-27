import { NextResponse } from 'next/server';
import { dispatchContactInquiry } from '@/lib/email';
import { adminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, mobile, subject, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and message are required.' },
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

    const resolvedSubject = subject?.trim() || 'General Pillar Inquiry';

    // Save to Firestore — contact_inquiries collection (safe fallback)
    try {
      await adminDb.collection('contact_inquiries').add({
        fullName:  fullName.trim(),
        email:     email.trim(),
        mobile:    mobile?.trim() || '',
        subject:   resolvedSubject,
        message:   message.trim(),
        createdAt: Timestamp.now(),
        status:    'new',
      });
    } catch (dbErr) {
      console.warn('Firestore contact save skipped/failed:', dbErr);
    }

    // Dispatch professional business-class email to valkyrriemeds@gmail.com AND client
    await dispatchContactInquiry({
      fullName: fullName.trim(),
      email:    email.trim(),
      mobile:   mobile?.trim() || '',
      subject:  resolvedSubject,
      message:  message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: `Thank you, ${fullName}! Your inquiry has been securely routed to valkyrriemeds@gmail.com and a confirmation receipt has been sent to ${email}.`,
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
