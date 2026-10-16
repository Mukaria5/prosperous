# Production readiness and deployment

## Local checks

Install the exact dependency versions from the lockfile, then run the development server and checks:

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

The Vite production build is written to `dist/`. There are no runtime environment variables or backend services. Public contact details live in `src/data/siteConfig.ts`. The contact form opens a prefilled email draft; it does not submit data to a server.

## GitHub and Vercel

After the checks pass, create a new empty GitHub repository, then use its URL below:

```sh
git add -A
git commit -m "Prepare portfolio for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

In Vercel, import that GitHub repository and use the Vite defaults: build command `npm run build`, output directory `dist`, and no environment variables. `vercel.json` rewrites application routes to the SPA entry point while Vercel continues to serve existing static assets. Future pushes to the connected branch will trigger deployments. No production domain is configured in this repository.

The repository currently has no commit or remote. Replace the GitHub URL placeholder with the actual repository URL before running the remote commands.
