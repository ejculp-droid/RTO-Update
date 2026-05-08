const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const TENANT_ID = process.env.AZURE_TENANT_ID;
const CLIENT_ID = process.env.AZURE_CLIENT_ID;
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;
const SEND_FROM = 'elliott@rtoadvisory.com';

function sanitizeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function getAccessToken() {
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'https://outlook.office365.com/.default'
  });

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token request failed: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function createTransporter(accessToken) {
  return nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      type: 'OAuth2',
      user: SEND_FROM,
      accessToken
    }
  });
}

async function sendEmail(transporter, to, subject, bodyHtml, pdfBuffer, attachmentName) {
  const mailOptions = {
    from: SEND_FROM,
    to,
    subject,
    html: bodyHtml,
    attachments: pdfBuffer ? [{ filename: attachmentName, content: pdfBuffer, contentType: 'application/pdf' }] : []
  };
  await transporter.sendMail(mailOptions);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    let { first_name, last_name, email, company, reader_type, reader_type_other } = body;

    if (!first_name || !last_name || !email || !company || !reader_type) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    if (!validateEmail(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email format' }) };
    }

    first_name = sanitizeHtml(first_name.trim());
    last_name = sanitizeHtml(last_name.trim());
    company = sanitizeHtml(company.trim());
    reader_type = sanitizeHtml(reader_type.trim());
    reader_type_other = reader_type_other ? sanitizeHtml(reader_type_other.trim()) : null;

    const pdfPath = path.join(process.cwd(), 'assets/white-papers/exit-readiness-gap.pdf');
    const pdfBuffer = fs.readFileSync(pdfPath);

    const accessToken = await getAccessToken();
    const transporter = await createTransporter(accessToken);

    await sendEmail(
      transporter,
      email,
      'Your RTO Advisory White Paper: Exit Readiness Gap Assessment',
      `<p>Hi ${first_name},</p>
       <p>Thank you for your interest in the Exit Readiness Gap Assessment white paper.</p>
       <p>Your copy is attached. We look forward to connecting with you.</p>
       <p>Best regards,<br />RTO Advisory</p>`,
      pdfBuffer,
      'exit-readiness-gap.pdf'
    );

    await sendEmail(
      transporter,
      SEND_FROM,
      `New White Paper Download: ${first_name} ${last_name}`,
      `<p>A new white paper was requested.</p>
       <ul>
         <li><strong>Name:</strong> ${first_name} ${last_name}</li>
         <li><strong>Email:</strong> ${email}</li>
         <li><strong>Company:</strong> ${company}</li>
         <li><strong>Reader Type:</strong> ${reader_type}${reader_type_other ? ` (${reader_type_other})` : ''}</li>
       </ul>`,
      null,
      null
    );

    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('send-pdf error:', error.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send white paper. Please try again.' }) };
  }
};
