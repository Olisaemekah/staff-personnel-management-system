# Staff Personnel Management System Backend

This repository adds a Supabase-backed API layer for the existing SPMS frontend.

## What is included

- `api/staff.js`: serverless API endpoint for staff search and create operations
- `lib/supabaseServer.js`: shared Supabase client wrapper
- `vercel.json`: deployment configuration for Vercel
- `package.json`: Node.js dependencies and dev tools

## Setup

1. Create a Supabase project.
2. Add the following environment variables in Vercel or a local `.env` file:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_ANON_KEY`

3. Create the required Supabase table using `supabase-schema.sql`.

## Deployment

- Local development: `npm install` then `npm run dev`
- Deploy to Vercel: `npx vercel deploy`

## GitHub

This repository has been initialized locally and committed.

To push to GitHub, add a remote and push from your local machine:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If you use GitHub CLI, authenticate first:

```bash
gh auth login
```

## Current status

- Backend scaffold created and committed locally.
- `package.json` and `vercel.json` are present.
- Supabase schema and API endpoints are in place.
- `npm install` is currently blocked by local npm installation instability / SIGINT failures.
- GitHub push and Vercel deployment require CLI authentication and successful dependency installation.

## Notes

- This backend is intentionally minimal to provide a clean API layer.
- For production, use hashed passwords and stricter access control.
