const configured =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nailstylehub.com";

export const siteUrl = configured.replace(/\/+$/, "");

export const siteConfig = {
  name: "HerSpace",
  url: siteUrl,
  description:
    "Beauty, fashion, lifestyle, food, animal and travel ideas — HerSpace is a lifestyle space for every woman.",
  locale: "en_US",
  themeColor: "#7c3aed",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}

export const categoryPath = (slug: string) => `/category/${slug}`;

export const subcategoryPath = (categorySlug: string, subcategorySlug: string) =>
  `/category/${categorySlug}/${subcategorySlug}`;

export const articlePath = (
  categorySlug: string,
  subcategorySlug: string,
  articleId: number
) => `/category/${categorySlug}/${subcategorySlug}/${articleId}`;

/* ── metadata helpers ───────────────────────────────────── */

export function clampDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

/**
 * Trim an article body down to a snippet. Pull-quote-only text still reads
 * better than the first paragraph truncated mid-sentence.
 */
export function articleExcerpt(paragraphs: string[], max = 158): string {
  const joined = paragraphs.join(" ").replace(/\s+/g, " ").trim();
  return clampDescription(joined, max);
}

export function breadcrumbs(
  trail: { name: string; path: string }[]
): { name: string; path: string }[] {
  return [{ name: "Home", path: "/" }, ...trail];
}

export function breadcrumbListJsonLd(
  trail: { name: string; path: string }[]
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs(trail).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  });
}

export function articleJsonLd({
  title,
  description,
  image,
  path,
  author,
  publishedAt,
  readTime,
  keywords,
}: {
  title: string;
  description: string;
  image: string;
  path: string;
  author: string;
  publishedAt: string;
  readTime: string;
  keywords: string[];
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: clampDescription(description),
    image: [image],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    keywords: keywords.join(", "),
    timeRequired: readTime.replace(" read", ""),
  });
}

export function collectionJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: clampDescription(description),
    url: absoluteUrl(path),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  });
}

export function websiteJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
    },
  });
}