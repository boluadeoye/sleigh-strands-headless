import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });

    const baseUrl = process.env.WC_SITE_URL || 'https://sleighstrands.com/admin';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const auth = `?consumer_key=${ck}&consumer_secret=${cs}`;

    // Update the WooCommerce order status to 'cancelled'
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/orders/${orderId}${auth}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled', note: 'Customer cancelled at payment gateway.' })
    });

    if (!res.ok) throw new Error('Failed to cancel order');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
