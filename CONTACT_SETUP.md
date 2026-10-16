# Contact form setup

The browser posts inquiries to `/api/contact`. The Vercel function validates the submission and calls the EmailJS REST API. EmailJS credentials are read only by `api/contact.ts`; the Vite client does not read or bundle these environment variables.

## Required environment variables

Configure these values locally in `.env.local` and in Vercel under **Project Settings → Environment Variables**:

| Variable | Value |
| --- | --- |
| `EMAILJS_SERVICE_ID` | `service_ano21v8` |
| `EMAILJS_TEMPLATE_ID` | `template_lhmys4r` |
| `EMAILJS_PUBLIC_KEY` | The EmailJS public key from your EmailJS account |
| `EMAILJS_PRIVATE_KEY` | The EmailJS private key from your EmailJS account; server-side only |

Add all four variables to the Vercel environments where the site will run (Production, Preview, and Development as appropriate). Redeploy after changing Vercel environment variables. Never add the private key to client code or a `VITE_` variable.

Copy `.env.example` to `.env.local` for local setup, then replace its placeholders. `.env.local` is ignored by Git. To run the API locally, link the project with the Vercel CLI, pull local variables with `vercel env pull .env.local` if they are configured in Vercel, and run `vercel dev`. Vercel serves both the Vite SPA and `/api/contact`; the existing final catch-all rewrite remains in place for client-side routes.

The EmailJS template must have the recipient configured as `prodesignske@gmail.com` and use these exact template variables: `name`, `email`, `company`, `project_type`, `budget`, `timeline`, `reference_url`, and `project_description`.

The API reports success only after EmailJS returns a successful HTTP response. This confirms provider acceptance, not final delivery to the recipient's inbox. No real submission has been made as part of this code change.

Basic abuse controls include server-side field validation and length limits, an empty honeypot, same-origin checks, request-size limits, and an in-memory per-IP rate limit. Because Vercel can run multiple or short-lived function instances, this rate limit is best-effort per warm instance; use a shared rate-limit store or additional verification if stronger distributed abuse protection is required.
