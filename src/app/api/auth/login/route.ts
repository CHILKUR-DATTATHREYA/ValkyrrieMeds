import { NextResponse } from 'next/server';
import { authenticateCredentials } from '@/lib/userStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Both email and password are required.' },
        { status: 400 }
      );
    }

    const authResult = await authenticateCredentials(email, password);

    if (!authResult.success) {
      const statusCode = authResult.notRegistered ? 404 : 401;
      return NextResponse.json(
        {
          success: false,
          error: authResult.error,
          notRegistered: authResult.notRegistered || false,
          wrongPassword: authResult.wrongPassword || false,
        },
        { status: statusCode }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Login successful.',
      user: authResult.user,
    });

    response.cookies.set('vm_session', authResult.user!.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
