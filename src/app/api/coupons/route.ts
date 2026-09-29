import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: 'Please enter a code' }, { status: 400 });

    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const baseUrl = process.env.WC_SITE_URL || 'https://sleighstrands.com/admin';

    const cleanCode = code.trim().toUpperCase();
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/coupons?code=${cleanCode}&consumer_key=${ck}&consumer_secret=${cs}`);
    const coupons = await res.json();

    if (!Array.isArray(coupons) || coupons.length === 0) {
      return NextResponse.json({ error: 'Invalid coupon code' }, { status: 400 });
    }

    const coupon = coupons[0];

    if (coupon.date_expires && new Date(coupon.date_expires) < new Date()) {
      return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 });
    }

    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return NextResponse.json({ error: 'Usage limit reached' }, { status: 400 });
    }

    return NextResponse.json({
      code: coupon.code,
      amount: parseFloat(coupon.amount),
      type: coupon.discount_type 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error verifying coupon' }, { status: 500 });
  }
}
