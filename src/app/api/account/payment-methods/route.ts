import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get('id');
    
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';

    if (!tokenId || !ck || !cs) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Force=true is required by WooCommerce to permanently delete the token
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/payment_tokens/${tokenId}?force=true&consumer_key=${ck}&consumer_secret=${cs}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to delete token');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
