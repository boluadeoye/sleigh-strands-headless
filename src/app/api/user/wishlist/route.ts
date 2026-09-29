import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const baseUrl = process.env.WC_SITE_URL || 'https://sleighstrands.com/admin';

    // 1. Fetch fresh customer data (No Cache)
    const getRes = await fetch(`${baseUrl}/wp-json/wc/v3/customers/${userId}?consumer_key=${ck}&consumer_secret=${cs}`, { cache: 'no-store' });
    const customer = await getRes.json();

    if (!getRes.ok) throw new Error('Customer fetch failed');

    let metaData = customer.meta_data || [];
    let wishlistMeta = metaData.find((m: any) => m.key === '_sleigh_wishlist');
    let wishlistIds = wishlistMeta && wishlistMeta.value ? String(wishlistMeta.value).split(',').filter(Boolean).map(Number) : [];

    // 2. Toggle Logic
    const pId = Number(productId);
    if (wishlistIds.includes(pId)) {
      wishlistIds = wishlistIds.filter((id: number) => id !== pId);
    } else {
      wishlistIds.push(pId);
    }

    // 3. Update WordPress with 'Force Update' structure
    const updateRes = await fetch(`${baseUrl}/wp-json/wc/v3/customers/${userId}?consumer_key=${ck}&consumer_secret=${cs}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meta_data: [
          {
            key: '_sleigh_wishlist',
            value: wishlistIds.join(',')
          }
        ]
      })
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      console.error("WP Update Error:", errorData);
      throw new Error('WP Update Failed');
    }

    return NextResponse.json({ success: true, wishlistIds });
  } catch (error: any) {
    console.error("Wishlist API Failure:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
