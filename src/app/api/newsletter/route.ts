import { NextResponse } from 'next/server';
import { sendEmail, getLuxuryTemplate } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sleigh.staymedia.ng';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    const url = `${baseUrl}/wp-json/wc/v3/customers?consumer_key=${ck}&consumer_secret=${cs}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        username: `${email.split('@')[0]}_${Date.now()}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.code === 'registration-error-email-exists') {
        return NextResponse.json({ message: 'Existing' }, { status: 409 });
      }
      return NextResponse.json({ error: data.message || 'Subscription failed' }, { status: 400 });
    }

    // Direct SMTP Dispatch to Subscriber
    try {
      const emailContent = getLuxuryTemplate(
        "Welcome to the Sleigh List! ✨",
        `<p>Hi Sleigh Babe,</p>
         <p>You have officially been added to the Sleigh Strands newsletter. You are now on the inside.</p>
         <p>Get ready for exclusive early access to our Friday Hot Drops, bespoke wig styling tips, and private, subscriber-only promotions.</p>
         <p>To celebrate, use the code below during checkout for a special treat on your first purchase:</p>
         <div style="background-color: #FDF8F0; border: 1px dashed #8B2632; padding: 15px; text-align: center; margin-top: 20px; font-weight: bold; font-size: 18px; color: #8B2632; letter-spacing: 0.1em; border-radius: 12px;">
           SLEIGHBABE10
         </div>
         <a href="https://sleigh-strands-headless.vercel.app/shop" class="button">Shop Wigs Now</a>`
      );
      await sendEmail({
        to: email,
        subject: "You're on the Sleigh List! ✨",
        html: emailContent
      });
    } catch (mailError) {
      console.error("Newsletter email failed:", mailError);
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
