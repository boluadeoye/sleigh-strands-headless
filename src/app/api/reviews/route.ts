import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { product_id, review, reviewer, reviewer_email, rating } = await req.json();

    if (!product_id || !review || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    const response = await fetch(`${baseUrl}/wp-json/wc/v3/products/reviews?consumer_key=${ck}&consumer_secret=${cs}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: Number(product_id),
        review,
        reviewer: reviewer || 'Sleigh Babe',
        reviewer_email: reviewer_email || 'guest@sleighstrands.shop',
        rating: Number(rating)
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('WooCommerce Review Error:', data);
      return NextResponse.json({ error: data.message || 'Failed to submit review' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API Crash:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
