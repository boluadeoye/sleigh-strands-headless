import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sleigh.staymedia.ng';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    const url = `${baseUrl}/wp-json/wc/v3/customers?consumer_key=${ck}&consumer_secret=${cs}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        username: `${email.split('@')[0]}_${Date.now()}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.code === 'registration-error-email-exists') {
        return NextResponse.json({ message: 'Existing' }, { status: 409 });
      }
      return NextResponse.json({ error: data.message || 'Subscription failed' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
