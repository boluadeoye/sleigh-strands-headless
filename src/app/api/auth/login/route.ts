import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    const authRes = await fetch(`${baseUrl}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const authData = await authRes.json();
    if (!authRes.ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // Fetch the numeric ID using the email
    const userRes = await fetch(`${baseUrl}/wp-json/wc/v3/customers?email=${username}&consumer_key=${ck}&consumer_secret=${cs}`);
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
