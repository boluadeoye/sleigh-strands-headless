import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('verif-hash');
    if (!signature || signature !== process.env.FLW_WEBHOOK_HASH) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();

    if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
      const transactionId = payload.data.id;
      const txRef = payload.data.tx_ref; 
      
      const orderIdMatch = txRef.match(/SLEIGH_ORD_(\d+)_/);
      if (!orderIdMatch) return NextResponse.json({ error: 'Invalid tx_ref format' }, { status: 400 });
      const orderId = orderIdMatch[1];

      const verifyRes = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      const verifyData = await verifyRes.json();

      if (verifyData.status === 'success' && verifyData.data.status === 'successful') {
        const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
        const ck = process.env.WC_CONSUMER_KEY;
        const cs = process.env.WC_CONSUMER_SECRET;
        const auth = `?consumer_key=${ck}&consumer_secret=${cs}`;

        const orderRes = await fetch(`${baseUrl}/wp-json/wc/v3/orders/${orderId}${auth}`);
        const order = await orderRes.json();

        if (order.status === 'processing' || order.status === 'completed') {
          return NextResponse.json({ message: 'Order already processed' }, { status: 200 });
        }

        if (Number(order.total) <= verifyData.data.amount) {
          // Update WooCommerce order status. This PUT request natively triggers WordPress transactional emails
          await fetch(`${baseUrl}/wp-json/wc/v3/orders/${orderId}${auth}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: 'processing',
              set_paid: true,
              transaction_id: transactionId.toString(),
              note: `Flutterwave payment successful. Ref: ${txRef}`
            })
          });
        } else {
          await fetch(`${baseUrl}/wp-json/wc/v3/orders/${orderId}${auth}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: 'on-hold',
              note: `Payment amount mismatch. Expected ${order.total}, received ${verifyData.data.amount}. Ref: ${txRef}`
            })
          });
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Flutterwave Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
