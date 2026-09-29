import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('id');
  const ck = process.env.WC_CONSUMER_KEY;
  const cs = process.env.WC_CONSUMER_SECRET;
  const rawUrl = process.env.WC_SITE_URL || 'https://sleighstrands.com/admin';
  const baseUrl = rawUrl.replace(/\/$/, '');

  if (!userId || !ck || !cs) {
    return NextResponse.json({ error: 'Config missing' }, { status: 400 });
  }

  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };

  try {
    const [ordersRes, customerRes, tokensRes] = await Promise.all([
      fetch(`${baseUrl}/wp-json/wc/v3/orders?customer=${userId}&consumer_key=${ck}&consumer_secret=${cs}`, { headers, cache: 'no-store' }),
      fetch(`${baseUrl}/wp-json/wc/v3/customers/${userId}?consumer_key=${ck}&consumer_secret=${cs}`, { headers, cache: 'no-store' }),
      fetch(`${baseUrl}/wp-json/wc/v3/payment_tokens?customer=${userId}&consumer_key=${ck}&consumer_secret=${cs}`, { headers, cache: 'no-store' })
    ]);

    const orders = await ordersRes.json();
    const customer = await customerRes.json();
    const paymentTokens = tokensRes.ok ? await tokensRes.json() : [];

    let wishlistProducts = [];
    if (customer && customer.meta_data) {
      const wishlistMeta = customer.meta_data.find((m: any) => m.key === '_sleigh_wishlist');
      if (wishlistMeta && wishlistMeta.value) {
        const ids = String(wishlistMeta.value);
        if (ids.length > 0) {
          const productsRes = await fetch(`${baseUrl}/wp-json/wc/v3/products?include=${ids}&consumer_key=${ck}&consumer_secret=${cs}`, { headers, cache: 'no-store' });
          if (productsRes.ok) {
            wishlistProducts = await productsRes.json();
          }
        }
      }
    }

    return NextResponse.json(
      { orders, customer, wishlistProducts, paymentTokens },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
