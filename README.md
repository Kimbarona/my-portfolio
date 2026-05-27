# Portfolio

React/Vite portfolio with Vercel serverless API routes for the AI assistant and contact form.

## Local Development

Install dependencies, then run the API mock server and Vite dev server:

```bash
npm install
npm run dev:api
npm run dev
```

The Vite dev server proxies `/api/*` requests to `http://localhost:3001`.

## Contact Form Email Setup

The contact form uses Resend from the serverless `/api/contact` endpoint, keeping the API key out of the browser.

Create `.env` locally and add the same variables in Vercel:

```bash
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL="Portfolio Contact <hello@yourdomain.com>"
CONTACT_TO_EMAIL=your_email@example.com
CONTACT_SEND_CONFIRMATION=true
```

Notes:
- Use a verified Resend sending domain for `RESEND_FROM_EMAIL` in production.
- Set `CONTACT_TO_EMAIL` to the inbox where inquiries should arrive.
- Set `CONTACT_SEND_CONFIRMATION=false` if you only want the on-page success message and do not want confirmation emails sent to visitors.

## Deployment

Deploy to Vercel with:

```bash
npm run build
```

Add all environment variables in Vercel Project Settings before testing the production contact form.
