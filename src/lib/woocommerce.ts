export async function getWooProducts(categorySlug?: string) {
  const ck = process.env.WC_CONSUMER_KEY;
  const cs = process.env.WC_CONSUMER_SECRET;
  const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
  
  try {
    const url = new URL(`${baseUrl}/wp-json/wc/v3/products`);
    url.searchParams.append('consumer_key', ck || '');
    url.searchParams.append('consumer_secret', cs || '');
    url.searchParams.append('per_page', '12');
    url.searchParams.append('status', 'publish');

    if (categorySlug) {
      url.searchParams.append('category', categorySlug);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("WooCommerce Fetch Error:", e);
    return [];
  }
}

export async function getSingleProduct(id: string) {
  const ck = process.env.WC_CONSUMER_KEY;
  const cs = process.env.WC_CONSUMER_SECRET;
  const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
  const auth = `consumer_key=${ck}&consumer_secret=${cs}`;

  try {
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/products/${id}?${auth}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const product = await res.json();

    // DEEP FETCH: If product is variable, fetch all variations
    if (product.type === 'variable' && product.variations?.length > 0) {
      const varRes = await fetch(`${baseUrl}/wp-json/wc/v3/products/${id}/variations?${auth}&per_page=100`, {
        next: { revalidate: 60 }
      });
      if (varRes.ok) {
        product.variations_data = await varRes.json();
      }
    }

    return product;
  } catch (e) {
    console.error("Single Product Fetch Error:", e);
    return null;
  }
}
