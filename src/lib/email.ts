import nodemailer from 'nodemailer';

export const ADMIN_EMAIL = 'valkyrriemeds@gmail.com';
export const BRAND_NAME = 'Valkyrrie Meds';
export const SITE_URL = 'https://valkyrriemeds.com';

// Configure transport with Gmail / SMTP or development fallback
function getTransporter() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (user && pass) {
    if (process.env.SMTP_HOST) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user, pass },
      });
    }
    // Default to Gmail service
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  // Fallback: local development transporter (mock / log)
  return null;
}

// ═══════════════════════════════════════════════════════════════════════
// EXECUTIVE HTML TEMPLATES (BUSINESS CLASS DESIGN)
// ═══════════════════════════════════════════════════════════════════════

function createExecutiveEmailLayout(content: string, preheader: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Valkyrrie Meds</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    .container { max-width: 620px; margin: 30px auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { background: #0f172a; padding: 32px 40px; text-align: center; border-bottom: 3px solid #0d9488; }
    .brand-title { color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 0.05em; margin: 0; text-transform: uppercase; }
    .brand-subtitle { color: #94a3b8; font-size: 13px; margin: 6px 0 0; letter-spacing: 0.03em; }
    .body { padding: 36px 40px; color: #1e293b; line-height: 1.65; font-size: 15px; }
    .meta-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 24px 0; }
    .meta-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .meta-row:last-child { border-bottom: none; }
    .meta-label { font-weight: 600; color: #64748b; width: 35%; }
    .meta-val { font-weight: 600; color: #0f172a; width: 65%; text-align: right; }
    .message-box { background: #ffffff; border-left: 4px solid #0d9488; border: 1px solid #e2e8f0; border-left-width: 4px; border-radius: 8px; padding: 18px 20px; margin: 20px 0; font-style: normal; color: #334155; }
    .btn-action { display: inline-block; background: #0f172a; color: #ffffff !important; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none; margin: 20px 0 10px; text-align: center; }
    .footer { background: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
    .footer a { color: #0d9488; text-decoration: none; }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#f1f5f9;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheader}
  </div>
  <div class="container">
    <div class="header">
      <h1 class="brand-title">VALKYRRIE MEDS</h1>
      <p class="brand-subtitle">Empower the Mind • Elevate the Self • Embark on the Journey</p>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p style="margin: 0 0 6px;"><strong>Valkyrrie Meds Pvt. Ltd.</strong></p>
      <p style="margin: 0 0 6px;">H No 2-7-271/5, St No. 5, Mamatha Nagar Colony, Nagole, Hyderabad, India</p>
      <p style="margin: 0;">Inquiries: <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a> | Instagram: <a href="https://www.instagram.com/valkyrrie.meds/">@valkyrrie.meds</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

// ═══════════════════════════════════════════════════════════════════════
// 1. CONTACT FORM / PILLAR INQUIRY DISPATCHER
// ═══════════════════════════════════════════════════════════════════════

export interface ContactPayload {
  fullName: string;
  email: string;
  mobile?: string;
  subject: string;
  message: string;
}

export async function dispatchContactInquiry(payload: ContactPayload) {
  const { fullName, email, mobile, subject, message } = payload;
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. BUSINESS NOTIFICATION (To valkyrriemeds@gmail.com)
  const adminHtml = createExecutiveEmailLayout(
    `
      <div style="display:inline-block;background:#e0f2fe;color:#0369a1;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">
        New Client Inquiry Received
      </div>
      <h2 style="font-size:20px;color:#0f172a;margin:0 0 16px;font-weight:700;">
        Inquiry: ${subject}
      </h2>
      <p style="color:#475569;margin-bottom:20px;">
        A new client submission has been received from the Valkyrrie Meds portal. Details are outlined below:
      </p>

      <div class="meta-card">
        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Client Name</td>
            <td style="padding:8px 0;font-weight:700;color:#0f172a;text-align:right;">${fullName}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Client Email</td>
            <td style="padding:8px 0;font-weight:700;color:#0284c7;text-align:right;"><a href="mailto:${email}" style="color:#0284c7;text-decoration:none;">${email}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Contact / Mobile</td>
            <td style="padding:8px 0;font-weight:700;color:#0f172a;text-align:right;">${mobile || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Pillar / Subject</td>
            <td style="padding:8px 0;font-weight:700;color:#0d9488;text-align:right;">${subject}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Submitted At</td>
            <td style="padding:8px 0;color:#64748b;text-align:right;">${timestamp} IST</td>
          </tr>
        </table>
      </div>

      <h3 style="font-size:15px;color:#0f172a;margin:24px 0 8px;font-weight:700;">Client Message / Request:</h3>
      <div class="message-box">
        "${message.replace(/\n/g, '<br/>')}"
      </div>

      <div style="text-align:center;margin-top:28px;">
        <a href="mailto:${email}?subject=${encodeURIComponent(`Re: [Valkyrrie Meds] ${subject}`)}" class="btn-action">
          Reply Directly to ${fullName} →
        </a>
      </div>
    `,
    `New client inquiry from ${fullName}: ${subject}`
  );

  // 2. CLIENT CONFIRMATION (To client email)
  const clientHtml = createExecutiveEmailLayout(
    `
      <div style="display:inline-block;background:#f0fdf4;color:#15803d;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">
        Message Confirmed
      </div>
      <h2 style="font-size:20px;color:#0f172a;margin:0 0 16px;font-weight:700;">
        Thank You for Reaching Out, ${fullName}
      </h2>
      <p style="color:#475569;margin-bottom:16px;">
        We have safely received your inquiry regarding <strong>${subject}</strong>.
      </p>
      <p style="color:#475569;margin-bottom:20px;">
        At Valkyrrie Meds, we are committed to helping you turn your vision into reality, build unshakeable communication confidence, and cultivate mental calm. A dedicated senior advisor is reviewing your message and will connect with you within <strong>24 to 48 hours</strong>.
      </p>

      <div class="meta-card">
        <h4 style="margin:0 0 10px;font-size:14px;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">Your Submission Summary</h4>
        <p style="margin:0 0 6px;font-size:14px;color:#475569;"><strong>Topic:</strong> ${subject}</p>
        <p style="margin:0;font-size:14px;color:#475569;"><strong>Recorded Time:</strong> ${timestamp} IST</p>
      </div>

      <p style="color:#64748b;font-size:14px;margin-top:24px;">
        If you have urgent documents or specific schedules to share, feel free to reply directly to this email at <a href="mailto:${ADMIN_EMAIL}" style="color:#0d9488;">${ADMIN_EMAIL}</a>.
      </p>

      <div style="text-align:center;margin-top:24px;">
        <a href="https://valkyrriemeds.com/programs" class="btn-action">
          Explore Our Transformative Programs →
        </a>
      </div>
    `,
    `We have received your message regarding ${subject} — Valkyrrie Meds`
  );

  const transporter = getTransporter();

  if (transporter) {
    try {
      // Send to Admin
      await transporter.sendMail({
        from: `"Valkyrrie Meds Portal" <${ADMIN_EMAIL}>`,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `[Client Inquiry] ${fullName} — ${subject}`,
        html: adminHtml,
      });

      // Send to Client
      await transporter.sendMail({
        from: `"Valkyrrie Meds" <${ADMIN_EMAIL}>`,
        to: email,
        replyTo: ADMIN_EMAIL,
        subject: `Thank you for contacting Valkyrrie Meds — ${subject}`,
        html: clientHtml,
      });

      console.log(`[Email Dispatched Successfully] Sent to ${ADMIN_EMAIL} and ${email}`);
    } catch (err) {
      console.error('[Email Dispatch Error]:', err);
    }
  } else {
    console.log(`[Email Transporter (Mock / Console Mode)]`);
    console.log(`TO ADMIN: ${ADMIN_EMAIL} | Subject: [Client Inquiry] ${fullName} — ${subject}`);
    console.log(`TO CLIENT: ${email} | Subject: Thank you for contacting Valkyrrie Meds — ${subject}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// 2. JOIN US / COHORT APPLICATION DISPATCHER
// ═══════════════════════════════════════════════════════════════════════

export interface JoinPayload {
  fullName: string;
  email: string;
  phone?: string;
  city: string;
  interest: string;
  message?: string;
  howHeard?: string;
}

export async function dispatchJoinApplication(payload: JoinPayload) {
  const { fullName, email, phone, city, interest, message, howHeard } = payload;
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. BUSINESS APPLICATION DOSSIER (To valkyrriemeds@gmail.com)
  const adminHtml = createExecutiveEmailLayout(
    `
      <div style="display:inline-block;background:#fef3c7;color:#b45309;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">
        New Cohort Application
      </div>
      <h2 style="font-size:20px;color:#0f172a;margin:0 0 16px;font-weight:700;">
        Applicant Dossier: ${fullName}
      </h2>

      <div class="meta-card">
        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Applicant</td>
            <td style="padding:8px 0;font-weight:700;color:#0f172a;text-align:right;">${fullName}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Email</td>
            <td style="padding:8px 0;font-weight:700;color:#0284c7;text-align:right;"><a href="mailto:${email}" style="color:#0284c7;text-decoration:none;">${email}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Phone</td>
            <td style="padding:8px 0;font-weight:700;color:#0f172a;text-align:right;">${phone || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">City / Location</td>
            <td style="padding:8px 0;font-weight:700;color:#0f172a;text-align:right;">${city}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Primary Focus Area</td>
            <td style="padding:8px 0;font-weight:700;color:#0d9488;text-align:right;">${interest}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Discovery Source</td>
            <td style="padding:8px 0;color:#64748b;text-align:right;">${howHeard || 'Website'}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#64748b;">Applied At</td>
            <td style="padding:8px 0;color:#64748b;text-align:right;">${timestamp} IST</td>
          </tr>
        </table>
      </div>

      ${
        message
          ? `<h3 style="font-size:15px;color:#0f172a;margin:24px 0 8px;font-weight:700;">Applicant Goals & Motivation:</h3>
             <div class="message-box">"${message.replace(/\n/g, '<br/>')}"</div>`
          : ''
      }

      <div style="text-align:center;margin-top:28px;">
        <a href="mailto:${email}?subject=${encodeURIComponent(`Valkyrrie Meds Application Review — Welcome ${fullName}`)}" class="btn-action">
          Connect with Candidate →
        </a>
      </div>
    `,
    `Cohort Application received from ${fullName} (${city}) - Focus: ${interest}`
  );

  // 2. APPLICANT WELCOME & RECEIPT (To applicant email)
  const clientHtml = createExecutiveEmailLayout(
    `
      <div style="display:inline-block;background:#f0fdf4;color:#15803d;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">
        Application Received
      </div>
      <h2 style="font-size:20px;color:#0f172a;margin:0 0 16px;font-weight:700;">
        Welcome to the Valkyrrie Meds Journey, ${fullName}!
      </h2>
      <p style="color:#475569;margin-bottom:16px;">
        Thank you for submitting your application to join the <strong>${interest}</strong> cohort.
      </p>
      <p style="color:#475569;margin-bottom:20px;">
        Our admissions committee personally evaluates each profile to ensure a high-caliber peer group and maximize individual transformation. Here is what happens next:
      </p>

      <div class="meta-card">
        <p style="margin:0 0 10px;font-size:14px;color:#0f172a;"><strong>Step 1:</strong> Profile Review &amp; Syllabus Alignment (24-48 hrs)</p>
        <p style="margin:0 0 10px;font-size:14px;color:#0f172a;"><strong>Step 2:</strong> 1-on-1 Discovery Call with Program Facilitator</p>
        <p style="margin:0;font-size:14px;color:#0f172a;"><strong>Step 3:</strong> Final Cohort Enrollment &amp; Welcome Kit</p>
      </div>

      <p style="color:#64748b;font-size:14px;margin-top:24px;">
        Stay inspired and connect with our community on Instagram: <a href="https://www.instagram.com/valkyrrie.meds/" style="color:#0d9488;font-weight:600;">@valkyrrie.meds</a>.
      </p>
    `,
    `Your Valkyrrie Meds Application has been received, ${fullName}`
  );

  const transporter = getTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Valkyrrie Meds Admissions" <${ADMIN_EMAIL}>`,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `[Application] ${fullName} — ${interest} (${city})`,
        html: adminHtml,
      });

      await transporter.sendMail({
        from: `"Valkyrrie Meds" <${ADMIN_EMAIL}>`,
        to: email,
        replyTo: ADMIN_EMAIL,
        subject: `Valkyrrie Meds Application Confirmation — ${interest}`,
        html: clientHtml,
      });
      console.log(`[Application Email Dispatched] Sent to ${ADMIN_EMAIL} and ${email}`);
    } catch (err) {
      console.error('[Application Email Dispatch Error]:', err);
    }
  } else {
    console.log(`[Email Transporter (Mock / Console Mode)] Application for ${fullName} logged.`);
  }
}
