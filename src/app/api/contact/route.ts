import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const baseUrl = process.env.WC_SITE_URL || 'https://sleighstrands.com/admin';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const FORM_ID = '8';

    const WP_API_URL = `${baseUrl}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback?consumer_key=${ck}&consumer_secret=${cs}`;

    const formData = new FormData();
    formData.append('your-name', name || '');
    formData.append('your-email', email || '');
    formData.append('your-message', message || '');
    formData.append('your-subject', `Website Inquiry: ${name}`);
    formData.append('_wpcf7', FORM_ID);
    formData.append('_wpcf7_unit_tag', `wpcf7-f${FORM_ID}-p-o1`);

    const response = await fetch(WP_API_URL, {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: formData,
      cache: 'no-store'
    });

    const result = await response.json();
    const isSuccess = result.status === 'mail_sent' || result.status === 'mail_failed';

    if (response.ok && isSuccess) {
      return NextResponse.json({
        success: true,
        message: "Inquiry synchronized with Flamingo"
      });
    } else {
      console.error("WordPress CF7 Reject:", result);
      return NextResponse.json({
        success: false,
        error: result.message || "Submission rejected"
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Contact Bridge Exception:", error);
    return NextResponse.json({ error: "Internal Bridge Error" }, { status: 500 });
  }
}
