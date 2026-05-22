import { NextResponse } from 'next/server';
import { sendEmail, getLuxuryTemplate } from '@/lib/mail';

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
          // Update WooCommerce
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

          // Direct SMTP Dispatch (Order Receipts)
          try {
            const customerEmail = order.billing?.email || verifyData.data.customer?.email;
            const customerName = order.billing?.first_name || verifyData.data.customer?.name || 'Babe';
            const orderTotal = parseFloat(order.total).toLocaleString();

            // A. Customer Receipt
            const customerEmailContent = getLuxuryTemplate(
              "Order Confirmed! ✨",
              `<p>Hi ${customerName},</p>
               <p>Thank you for shopping with Sleigh Strands. We are excited to prepare your luxury order!</p>
               <div style="background-color: #FDF8F0; border: 1px solid rgba(61, 18, 24, 0.1); padding: 20px; border-radius: 12px; margin-top: 20px; margin-bottom: 20px;">
                 <h4 style="margin-top: 0; color: #8B2632; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">Order Details</h4>
                 <p style="margin: 5px 0; font-size: 13px;"><strong>Order ID:</strong> #${orderId}</p>
                 <p style="margin: 5px 0; font-size: 13px;"><strong>Total Paid:</strong> ₦${orderTotal}</p>
                 <p style="margin: 5px 0; font-size: 13px;"><strong>Status:</strong> Processing</p>
               </div>
               <p>We are already working on preparing, inspecting, and styling your wig to our Sleigh Strands standard. You will receive email updates as soon as your order has been processed and shipped.</p>
               <p>Thank you for choosing Sleigh Strands.</p>
               <a href="https://sleigh-strands-headless.vercel.app/account" class="button">Track Your Order</a>`
            );

            await sendEmail({
              to: customerEmail,
              subject: `Your Sleigh Strands Order Confirmed! #${orderId} ✨`,
              html: customerEmailContent
            });

            // B. Admin Alert
            const adminEmailContent = getLuxuryTemplate(
              "New Order Received! 🚀",
              `<p>A new transaction has been successfully completed and verified via Flutterwave.</p>
               <div style="background-color: #FDF8F0; border: 1px solid rgba(61, 18, 24, 0.1); padding: 20px; border-radius: 12px; margin-top: 20px;">
                 <p style="margin: 5px 0; font-size: 13px;"><strong>Order ID:</strong> #${orderId}</p>
                 <p style="margin: 5px 0; font-size: 13px;"><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
                 <p style="margin: 5px 0; font-size: 13px;"><strong>Total Charged:</strong> ₦${orderTotal}</p>
                 <p style="margin: 5px 0; font-size: 13px;"><strong>Transaction ID:</strong> ${transactionId}</p>
               </div>
               <a href="https://sleigh.staymedia.ng/wp-admin/post.php?post=${orderId}&action=edit" class="button">View in WooCommerce</a>`
            );

            await sendEmail({
              to: process.env.SMTP_USER || 'info@sleighstrands.com',
              subject: `New Sleigh Strands Order #${orderId} 🚀`,
              html: adminEmailContent
            });

          } catch (mailError) {
            console.error("Order confirmation emails failed:", mailError);
          }

        } else {
          // Amount mismatch (Potential fraud)
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
