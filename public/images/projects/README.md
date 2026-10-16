# Project screenshots

Place project screenshots in the matching folder below. Unconfigured projects use an explicitly labeled visual placeholder instead of a fabricated product screenshot.

```text
public/images/projects/
  fitcoach-app/
  load-link-app/
  arenyx/
  safari/
  medicare-plus/
  pesaflow/
```

The Safari project currently uses `safari/cover.webp`, optimized from the supplied screenshot. An earlier third-party-branded reference remains outside `public/` at `src/assets/reference/safari-concept-legacy-reference.png` and is not included in production assets.

## Add or replace a project preview

1. Copy image files into that project's folder. WebP is recommended for screenshots; keep the original dimensions appropriate for the preview.
2. Open `src/data/projects.ts` and set `coverImage` to an object with its public path and descriptive alt text. For example:

   ```ts
   coverImage: {
     src: '/images/projects/fitcoach-ai.png',
     alt: 'FitCoach AI landing page showing daily health habits and its AI accountability coach',
   },
   ```

3. Add further images to `screenshots` using the same `{ src, alt }` shape. Each image is lazy-loaded; missing files fall back to the designed placeholder.
4. Add a new project by adding one `Project` object to `src/data/projects.ts`. Use a unique `id` and `slug`; set `featured` to `true` for the wider editorial card.
5. Set `technologies`, `status`, `liveUrl`, and `repositoryUrl` only when verified. Leave optional details empty when unknown. A project action appears only when its URL is provided.
6. Save. Vite normally refreshes the page automatically; restart `npm run dev` only if the development server has stopped.

The `src/data/projects.ts` configuration is the source of truth for gallery content. Only images configured there are displayed as project previews.
