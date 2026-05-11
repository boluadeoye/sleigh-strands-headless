import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';

    if (!ck || !cs) {
      return NextResponse.json({ error: 'Server configuration missing' }, { status: 500 });
    }

    const res = await fetch(`${baseUrl}/wp-json/wc/v3/customers/${userId}?consumer_key=${ck}&consumer_secret=${cs}`);
    const data = await res.json();

    if (!res.ok) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // SANITIZATION: Ensure no nulls or undefined values reach the UI
    return NextResponse.json({
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      email: data.email || '',
      phone: data.billing?.phone || '',
      address: data.shipping?.address_1 || data.billing?.address_1 || '',
      city: data.shipping?.city || data.billing?.city || '',
      state: data.shipping?.state || data.billing?.state || 'LA'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
