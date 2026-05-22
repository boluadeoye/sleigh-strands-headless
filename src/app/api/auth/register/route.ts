import { NextResponse } from 'next/server';
import { sendEmail, getLuxuryTemplate } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();
    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const auth = `?consumer_key=${ck}&consumer_secret=${cs}`;

    const response = await fetch(`${baseUrl}/wp-json/wc/v3/customers${auth}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName || '',
        last_name: lastName || '',
        username: firstName ? `${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}` : email.split('@')[0],
        role: 'customer'
      }),
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.message || 'Registration failed' }, { status: response.status });

    // Direct SMTP Dispatch to New User
    try {
      const emailContent = getLuxuryTemplate(
        "Welcome, Sleigh Babe! 🤍",
        `<p>Hi ${firstName || 'Babe'},</p>
         <p>Your account has been successfully created. Welcome to Sleigh Strands, the ultimate destination for luxury blend and premium synthetic wigs.</p>
         <p>From now on, you have exclusive access to track your orders, manage your saved payment methods, and be the first to know about our Friday Hot Drops.</p>
         <p>We are excited to join you on your hair transformation journey.</p>
         <p>Here's to sleighing your strands!</p>
         <a href="https://sleigh-strands-headless.vercel.app/shop" class="button">Explore the Collection</a>`
      );
      await sendEmail({
        to: email,
        subject: "Welcome to Sleigh Strands! 🤍",
        html: emailContent
      });
    } catch (mailError) {
      console.error("Welcome email failed to send:", mailError);
    }

    return NextResponse.json({ message: 'Success', id: data.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
