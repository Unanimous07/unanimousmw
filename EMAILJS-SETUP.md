# EmailJS Setup Guide

This guide will help you configure EmailJS to receive contact form submissions at **hello@unanimw.com**.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (Free account includes 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Connect your Google account
   - **Outlook**: Connect your Microsoft account
   - **Other**: Use SMTP settings
4. Click **"Create Service"**
5. **Copy the Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Set up your template:

### Template Settings:
- **Template Name**: Contact Form Submission
- **To Email**: `hello@unanimw.com`
- **From Name**: `{{from_name}}`
- **From Email**: `{{from_email}}`
- **Reply To**: `{{reply_to}}`

### Email Content:
**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Body:**
```html
<p><strong>New contact form submission from your website!</strong></p>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Service Interested In:</strong> {{service}}</p>
<p><strong>Budget:</strong> {{budget}}</p>

<p><strong>Message:</strong></p>
<p>{{message}}</p>

<hr>
<p><em>This email was sent from the contact form on unanimw.com</em></p>
```

4. Click **"Save"**
5. **Copy the Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find your **Public Key** (looks like: `xxxxxxxxxxxxxx`)
3. Copy it

## Step 5: Configure Environment Variables (Recommended)

The contact form now sends through the server endpoint `/api/contact`, so EmailJS IDs are no longer hardcoded in client code.

Set these environment variables where your Node/SSR server runs:

```bash
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

For local PowerShell testing:

```powershell
$env:EMAILJS_SERVICE_ID="service_xxxxxxx"
$env:EMAILJS_TEMPLATE_ID="template_xxxxxxx"
$env:EMAILJS_PUBLIC_KEY="xxxxxxxxxxxxxx"
npm start
```

## Step 6: Test

1. Run your development server: `ng serve`
2. Go to the contact section
3. Fill out the form and submit
4. Check `hello@unanimw.com` for the email!

## Troubleshooting

### Emails not arriving?
- Check your EmailJS dashboard for failed sends
- Verify `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` are set correctly on the server
- Check spam folder in `hello@unanimw.com`
- Make sure your email service is connected and verified

### Form not submitting?
- Open browser console (F12) to check for errors
- Verify all required fields are filled
- Check network tab for failed requests

## Free Tier Limits

- **200 emails per month**
- If you need more, upgrade to EmailJS paid plan ($15/month for 1,000 emails)

## Alternative: Auto-Reply

To send an auto-reply to the user, create a second template in EmailJS and add another `emailjs.send()` call with:
- **To Email**: `{{from_email}}`
- **From Name**: Unanimous MW
- **Subject**: Thanks for contacting us!

## Support

- EmailJS Docs: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Need help? Contact: support@emailjs.com

---

**Important:** Keep your server environment variables private and never hardcode EmailJS IDs in frontend code.
