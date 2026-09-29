import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const rawUrl = process.env.WC_SITE_URL || 'https://sleighstrands.com/admin';
    const baseUrl = rawUrl.replace(/\/$/, '');

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    // Forward the email to our secure WordPress "Secret Door"
    const url = `${baseUrl}/wp-json/sleigh/v1/subscribe`;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      cache: 'no-store',
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.code === 'exists' || response.status === 409) {
        return NextResponse.json({ message: 'Existing' }, { status: 409 });
      }
      return NextResponse.json({ error: data.message || 'Subscription failed' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
