import { NextResponse } from 'next/server';
import { sendEmail, getLuxuryTemplate } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
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
      // Direct SMTP Dispatch to Admin
      try {
        const adminEmailContent = getLuxuryTemplate(
          "New Website Inquiry Received",
          `<p>A new contact form submission has been logged:</p>
           <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
             <tr>
               <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 120px;">Name:</td>
               <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${name}</td>
             </tr>
             <tr>
               <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Email:</td>
               <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}">${email}</a></td>
             </tr>
             <tr>
               <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Message:</td>
               <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; white-space: pre-wrap;">${message}</td>
             </tr>
           </table>`
        );

        await sendEmail({
          to: process.env.SMTP_USER || 'info@sleighstrands.com',
          subject: `New Sleigh Strands Inquiry from ${name}`,
          html: adminEmailContent
        });
      } catch (mailError) {
        console.error("Admin notification email failed:", mailError);
      }

      return NextResponse.json({
        success: true,
        message: "Inquiry synchronized and dispatched"
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
