import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rating, text } = body;

    console.log('[User Feedback Received]:', {
      rating,
      text,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Feedback received with thanks.',
    });
  } catch (error) {
    console.error('Error handling feedback:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record feedback.' },
      { status: 500 }
    );
  }
}
