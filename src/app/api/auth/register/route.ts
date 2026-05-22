import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();
    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const auth = `?consumer_key=${ck}&consumer_secret=${cs}`;

    const response = await fetch(`${baseUrl}/wp-json/wc/v3/customers${auth}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName || '',
        last_name: lastName || '',
        username: firstName ? `${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}` : email.split('@')[0],
        role: 'customer'
      }),
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.message || 'Registration failed' }, { status: response.status });

    return NextResponse.json({ message: 'Success', id: data.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
