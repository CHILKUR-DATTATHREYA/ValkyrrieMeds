import { NextResponse } from 'next/server';
import { registerNewUser } from '@/lib/userStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and password are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const result = await registerNewUser({ name, email, password });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          alreadyExists: result.alreadyExists,
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Your account is created.',
      user: result.user,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed due to a server error. Please try again.' },
      { status: 500 }
    );
  }
}
