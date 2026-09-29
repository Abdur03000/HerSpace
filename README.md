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

## Project structure

```
src/
├── app/
│   ├── category/[slug]/[subcategory]/[articleId]/page.tsx
│   ├── globals.css          # theme tokens, dark-mode overrides, animations
│   ├── icon.svg             # favicon
│   └── layout.tsx           # shell, theme bootstrap script
├── components/
│   ├── Navbar.tsx           # sticky header
│   ├── SearchModal.tsx      # ⌘K search
│   ├── CategoryIcon.tsx     # per-category SVG glyphs
│   ├── ThemeProvider.tsx    # light/dark state
│   └── ...
└── data/categories.ts       # all content
```

## Theming

Colours are CSS custom properties on `:root` and `[data-theme="dark"]` (`--bg-base`, `--text-primary`, `--nav-chip`, …). Components read them through Tailwind arbitrary values such as `bg-[var(--nav-chip)]`, so a theme change never needs a rebuild.

## Deploy

Deploy to [Vercel](https://vercel.com) or any platform that supports Next.js:

```bash
npm run build
```
