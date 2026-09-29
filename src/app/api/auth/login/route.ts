import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    // Clean URL: Remove trailing slash
    const rawUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
    const baseUrl = rawUrl.replace(/\/$/, '');
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    const authRes = await fetch(`${baseUrl}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ username, password }),
    });

    const authData = await authRes.json();
    if (!authRes.ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // Encode username (email) to handle the '@' symbol correctly
    const encodedEmail = encodeURIComponent(username);
    const userRes = await fetch(`${baseUrl}/wp-json/wc/v3/customers?email=${encodedEmail}&consumer_key=${ck}&consumer_secret=${cs}`, { headers });
    const userData = await userRes.json();
    const userId = userData.length > 0 ? userData[0].id : null;

    return NextResponse.json({
      token: authData.token,
      user: authData.user_display_name,
      id: userId
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
