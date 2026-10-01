# HerSpace — Agent notes

Next.js 16 App Router site. Lifestyle content: 6 categories, 23 subcategories,
46 articles, all from `src/data/categories.ts`. Tailwind v4, React 19, no icon
library (inline SVG).

## Commands

```bash
npm run dev
npm run build   # must pass before pushing — build runs tsc
npm run lint
```

There is no test suite. `npm run build` is the verification step.

## Live site

- Production: `https://www.nailstylehub.com` (www only — apex does not resolve)
- Deploy: Vercel, auto-deploys from `main` on GitHub
- Remote: `origin` = `https://github.com/Abdur03000/HerSpace.git` (a second
  remote named `hertarget` points at the same URL; ignore it)

## SEO setup

`src/lib/site.ts` owns the site URL, path builders, description clamping and
JSON-LD builders. Everything derives from one variable:

```
NEXT_PUBLIC_SITE_URL=https://www.nailstylehub.com
```

It falls back to that same value if unset, so a fresh clone works. Override it
only if the domain changes.

Metadata is per route via `generateMetadata`. Adding a category or article in
`src/data/categories.ts` is enough — sitemap, static params and internal links
all derive from the data. No manual registration anywhere.

Each article needs a `publishedAt`. It drives the visible `<time>`, the
`Article.datePublished` schema and sitemap `lastModified`. Bump it on edit,
otherwise the date goes stale.

## Rollback

The commit that introduced the SEO layer is `bdf89f3`. To undo it while keeping
history:

```bash
git revert bdf89f3
git push origin main
```

To go back to the last state known to be live on Vercel (before any SEO code):

```bash
git reset --hard pre-seo-deploy
git push --force origin main
```

Tag `pre-seo-deploy` points at `12ba9b4`, the last commit before the SEO work.
It's pushed to origin, so a fresh clone can reach it. Force-push rewrites
history — only use it if nobody else has pulled.

For a one-file undo, `git revert -n <commit>` then stage just that path.

## Brand

Site is branded **HerSpace** throughout — logo, titles, footer, OG text. The
domain says "nail style" but the content is six unrelated categories. That
mismatch is a known open question, not a bug to fix silently. The user was
told about it and chose to keep the current branding, so don't rename anything
unless asked.

## Known gaps

Not done, in rough priority order:

- No author pages. `author` is a plain string on each article, which is weak
  E-E-A-T for skincare and health content.
- Articles average ~238 words. This is the real ranking ceiling — technical SEO
  can't compensate.
- Footer has no Privacy / Terms / Contact pages. The links were removed rather
  than shipped as `href="#"` dead anchors.
- All images are hotlinked from Unsplash.