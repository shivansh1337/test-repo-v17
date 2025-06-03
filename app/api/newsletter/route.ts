import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing audience ID' },
        { status: 500 }
      );
    }

    // Add contact to Resend audience
    const response = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId,
    });

    if (response.error) {
      // Check if error is due to contact already existing
      if (response.error.message?.includes('already exists')) {
        return NextResponse.json(
          { error: 'You are already subscribed!' },
          { status: 400 }
        );
      }
      throw response.error;
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while subscribing' },
      { status: 500 }
    );
  }
}
