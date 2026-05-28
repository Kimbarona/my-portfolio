/* global process */

const MAX_BODY_SIZE = 12_000;
const MIN_MESSAGE_LENGTH = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const rateLimitStore = new Map();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
  return normalize(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);

  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function validatePayload(payload) {
  const data = {
    name: normalize(payload.name),
    email: normalize(payload.email).toLowerCase(),
    company: normalize(payload.company),
    projectType: normalize(payload.projectType),
    budget: normalize(payload.budget),
    subject: normalize(payload.subject),
    message: normalize(payload.message),
    website: normalize(payload.website),
  };

  const errors = {};

  if (!data.name) errors.name = 'Full name is required.';
  if (!data.email) errors.email = 'Email address is required.';
  if (data.email && !emailPattern.test(data.email)) errors.email = 'Enter a valid email address.';
  if (!data.subject) errors.subject = 'Subject is required.';
  if (!data.message) errors.message = 'Message is required.';
  if (data.message && data.message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  }
  if (data.website) errors.website = 'Spam protection triggered.';

  return { data, errors };
}

function buildOwnerEmail(data, timestamp) {
  const optionalRows = [
    data.company ? `<tr><td><strong>Company</strong></td><td>${escapeHtml(data.company)}</td></tr>` : '',
    data.projectType ? `<tr><td><strong>Project Type</strong></td><td>${escapeHtml(data.projectType)}</td></tr>` : '',
    data.budget ? `<tr><td><strong>Budget</strong></td><td>${escapeHtml(data.budget)}</td></tr>` : '',
  ].join('');

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#111827;line-height:1.6">
      <h2 style="margin:0 0 16px">New portfolio inquiry</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
        ${optionalRows}
        <tr><td><strong>Subject</strong></td><td>${escapeHtml(data.subject)}</td></tr>
        <tr><td><strong>Timestamp</strong></td><td>${escapeHtml(timestamp)}</td></tr>
      </table>
      <div style="margin-top:20px;padding:18px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb">
        <strong>Message</strong>
        <p style="white-space:pre-wrap;margin:10px 0 0">${escapeHtml(data.message)}</p>
      </div>
    </div>
  `;
}

function buildConfirmationEmail(data) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#111827;line-height:1.7">
      <h2 style="margin:0 0 12px">Thanks for reaching out, ${escapeHtml(data.name)}.</h2>
      <p>Your message was received successfully. I'll review the details and get back to you as soon as possible.</p>
      <div style="margin-top:18px;padding:16px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb">
        <strong>Your message</strong>
        <p style="white-space:pre-wrap;margin:10px 0 0">${escapeHtml(data.message)}</p>
      </div>
    </div>
  `;
}

async function sendResendEmail(apiKey, payload) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${errorBody}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
  const sendConfirmation = process.env.CONTACT_SEND_CONFIRMATION !== 'false';

  if (!apiKey || !toEmail) {
    console.error('Contact email service is not configured');
    return res.status(500).json({
      error: 'Contact form is not configured yet. Please email me directly for now.',
    });
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_SIZE) {
    return res.status(413).json({ error: 'Message is too large.' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many messages sent recently. Please wait a minute and try again.',
    });
  }

  const { data, errors } = validatePayload(req.body || {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Please review the highlighted fields.', errors });
  }

  const timestamp = new Date().toISOString();

  try {
    await sendResendEmail(apiKey, {
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `Portfolio inquiry: ${data.subject}`,
      html: buildOwnerEmail(data, timestamp),
      text: [
        'New portfolio inquiry',
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : '',
        data.projectType ? `Project Type: ${data.projectType}` : '',
        data.budget ? `Budget: ${data.budget}` : '',
        `Subject: ${data.subject}`,
        `Timestamp: ${timestamp}`,
        '',
        data.message,
      ].filter(Boolean).join('\n'),
    });

    if (sendConfirmation) {
      try {
        await sendResendEmail(apiKey, {
          from: fromEmail,
          to: [data.email],
          reply_to: toEmail,
          subject: 'Thanks for reaching out',
          html: buildConfirmationEmail(data),
          text: `Thanks for reaching out, ${data.name}.\n\nYour message was received successfully. I'll get back to you as soon as possible.\n\n${data.message}`,
        });
      } catch (confirmationError) {
        console.warn('Contact confirmation email error:', confirmationError);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Thanks for reaching out. I'll get back to you as soon as possible.",
    });
  } catch (error) {
    console.error('Contact form email error:', error);
    return res.status(502).json({
      error: 'I could not send the message right now. Please try again or email me directly.',
    });
  }
}
