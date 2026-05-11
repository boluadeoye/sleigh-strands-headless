import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('id');
  const ck = process.env.WC_CONSUMER_KEY;
  const cs = process.env.WC_CONSUMER_SECRET;
  const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';

  if (!userId || !ck || !cs) {
    return NextResponse.json({ error: 'Config missing' }, { status: 400 });
  }

  try {
    // Force no-store to prevent the "Disappearing on Refresh" bug
    const [ordersRes, customerRes] = await Promise.all([
      fetch(`${baseUrl}/wp-json/wc/v3/orders?customer=${userId}&consumer_key=${ck}&consumer_secret=${cs}`, { cache: 'no-store' }),
      fetch(`${baseUrl}/wp-json/wc/v3/customers/${userId}?consumer_key=${ck}&consumer_secret=${cs}`, { cache: 'no-store' })
    ]);

    const orders = await ordersRes.json();
    const customer = await customerRes.json();

    let wishlistProducts = [];
    if (customer && customer.meta_data) {
      const wishlistMeta = customer.meta_data.find((m: any) => m.key === '_sleigh_wishlist');
      if (wishlistMeta && wishlistMeta.value) {
        const ids = String(wishlistMeta.value); 
        if (ids.length > 0) {
          const productsRes = await fetch(`${baseUrl}/wp-json/wc/v3/products?include=${ids}&consumer_key=${ck}&consumer_secret=${cs}`, { cache: 'no-store' });
          if (productsRes.ok) {
            wishlistProducts = await productsRes.json();
          }
        }
      }
    }

    return NextResponse.json({ orders, customer, wishlistProducts });
  } catch (error) {
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
