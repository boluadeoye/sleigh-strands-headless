import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // SSL/TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  pool: true, // Re-uses SMTP handshakes to prevent throttling
});

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const mailOptions = {
    from: `"Sleigh Strands" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email dispatched successfully:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Nodemailer SMTP Error:", error);
    return { success: false, error };
  }
}

export function getLuxuryTemplate(title: string, content: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
        body {
          font-family: 'Montserrat', sans-serif;
          background-color: #FDF8F0;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          width: 100%;
          table-layout: fixed;
          background-color: #FDF8F0;
          padding: 40px 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          border: 1px solid rgba(61, 18, 24, 0.05);
        }
        .header {
          background-color: #8B2632;
          padding: 40px;
          text-align: center;
        }
        .header h1 {
          color: #FDF8F0;
          margin: 0;
          font-size: 28px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .header h1 span {
          color: #D2A546;
          font-family: serif;
          font-style: italic;
          text-transform: lowercase;
        }
        .content {
          padding: 40px;
          color: #0C0608;
          line-height: 1.8;
          font-size: 14px;
        }
        .footer {
          background-color: #0C0608;
          padding: 30px;
          text-align: center;
          color: #FDF8F0;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .button {
          display: inline-block;
          background-color: #8B2632;
          color: #FDF8F0 !important;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 50px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-size: 11px;
          margin-top: 24px;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1>Sleigh <span>Strands</span></h1>
          </div>
          <div class="content">
            <h2 style="color: #8B2632; font-size: 20px; margin-top: 0; margin-bottom: 20px; font-weight: 700;">${title}</h2>
            ${content}
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Sleigh Strands. All rights reserved.<br/>
            <span style="font-size: 9px; opacity: 0.5;">You are receiving this because you are a Sleigh Babe.</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
