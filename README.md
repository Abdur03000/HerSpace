# 🌸 HerSpace

A lifestyle content platform covering beauty, fashion, animals, lifestyle, food and travel — built with Next.js App Router and Tailwind CSS.

## Features

- **6 categories** with subcategories and articles, all driven by a typed data file (`src/data/categories.ts`)
- **Pinterest-style sticky navbar** — flat surface, neutral chips, pill search, labelled dark-mode toggle, scroll-aware shadow
- **Instant search** (`⌘K` / `Ctrl+K`) across every article, with a results modal
- **Dark mode** with no flash of the wrong theme — applied by a blocking script before first paint
- **Custom category icons** as hand-built SVG glyphs, plus emoji favicon and Apple touch icon
- **Newsletter signup** with a working subscribed state
- **Responsive** from 320px up, with 36px+ tap targets and no horizontal overflow
- **SEO foundation** — per-route titles/descriptions/canonicals, `sitemap.xml`, `robots.txt`, Article and BreadcrumbList JSON-LD, fully static prerendering

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript 5 |
| Icons | Inline SVG (no icon library) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Routes

| Route | Description |
|---|---|
| `/` | Home — hero, featured article, category grids |
| `/category/[slug]` | Category overview |
| `/category/[slug]/[subcategory]` | Subcategory article list |
| `/category/[slug]/[subcategory]/[articleId]` | Full article |
| `/sitemap.xml` | Generated from the content data |
| `/robots.txt` | Allow all, points at the sitemap |

## SEO

Every route carries its own `generateMetadata`. Article pages emit `Article` +
`BreadcrumbList` JSON-LD; hub pages emit `CollectionPage` + `ItemList`; the root
layout emits a site-wide `WebSite` entity. All 76 pages are prerendered to
static HTML at build time via `generateStaticParams`, so first paint doesn't wait
on a render.

Metadata helpers and the site URL live in `src/lib/site.ts`.

**Set the canonical URL before deploying.** Canonicals, OG URLs and the sitemap
all derive from one env var, and `metadataBase` is built from it:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Social profile links in the footer are opt-in via `NEXT_PUBLIC_INSTAGRAM_URL`,
`NEXT_PUBLIC_PINTEREST_URL` and `NEXT_PUBLIC_YOUTUBE_URL`. Unset, they render as
inert icons rather than dead `href="#"` anchors.

`publishedAt` on each article in `src/data/categories.ts` drives the visible date,
`Article.datePublished` and sitemap `lastModified`. Change it when you edit an
article — Google reads a stale date as a freshness lie.

## Project structure

```
src/
├── app/
│   ├── category/[slug]/[subcategory]/[articleId]/page.tsx
│   ├── globals.css          # theme tokens, dark-mode overrides, animations
│   ├── icon.svg             # favicon
│   ├── layout.tsx           # shell, theme bootstrap script, default metadata
│   ├── robots.ts            # robots.txt
│   └── sitemap.ts           # sitemap.xml, built from the content data
├── components/
│   ├── Navbar.tsx           # sticky header
│   ├── SearchModal.tsx      # ⌘K search
│   ├── CategoryIcon.tsx     # per-category SVG glyphs
│   ├── ThemeProvider.tsx    # light/dark state
│   └── ...
├── data/categories.ts       # all content
└── lib/site.ts              # site URL, metadata helpers, JSON-LD builders
```

## Theming

Colours are CSS custom properties on `:root` and `[data-theme="dark"]` (`--bg-base`, `--text-primary`, `--nav-chip`, …). Components read them through Tailwind arbitrary values such as `bg-[var(--nav-chip)]`, so a theme change never needs a rebuild.

## Deploy

Deploy to [Vercel](https://vercel.com) or any platform that supports Next.js:

```bash
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` in the deploy environment, then submit
`https://your-domain.com/sitemap.xml` in Google Search Console and request
indexing for the homepage.
