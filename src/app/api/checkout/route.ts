import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, coupon, shipping, customerId, transactionFee } = body;

    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const auth = `?consumer_key=${ck}&consumer_secret=${cs}`;

    const nameParts = customer.name ? customer.name.split(' ') : ['Guest'];
    const addressData = {
      first_name: nameParts[0],
      last_name: nameParts.slice(1).join(' ') || 'User',
      email: customer.email || '',
      address_1: customer.address || '',
      city: customer.city || '',
      state: customer.state || '',
      phone: customer.phone || '',
      country: 'NG'
    };

    // STEP 1: Create order as PENDING
    const createResponse = await fetch(`${baseUrl}/wp-json/wc/v3/orders${auth}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_method: 'flutterwave',
        payment_method_title: 'Flutterwave (Card/Transfer)',
        set_paid: false,
        status: 'pending',
        customer_id: customerId || 0,
        billing: addressData,
        shipping: addressData,
        line_items: items.map((item: any) => ({
          product_id: Number(item.id),
          variation_id: item.variationId ? Number(item.variationId) : undefined,
          quantity: Number(item.quantity)
        })),
        shipping_lines: [{
          method_id: shipping?.method_id || 'flat_rate',
          method_title: shipping?.method_title || 'Standard Shipping',
          total: String(shipping?.cost || 0)
        }],
        coupon_lines: coupon ? [{ code: coupon.code }] : [],
        fee_lines: [{ name: 'VAT & Processing', total: String(transactionFee || 800), tax_class: '' }]
      }),
    });

    const order = await createResponse.json();
    if (!createResponse.ok) throw new Error(order.message || 'Creation Failed');

    // Return the exact WooCommerce total to ensure the frontend charges the correct amount
    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      total: order.total,
      currency: order.currency || 'NGN'
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
