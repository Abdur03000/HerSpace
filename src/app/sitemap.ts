import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { absoluteUrl, articlePath, categoryPath, subcategoryPath } from "@/lib/site";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const articles = categories.flatMap((category) =>
    category.subcategories.flatMap((sub) =>
      sub.articles.map((article) => ({
        url: absoluteUrl(articlePath(category.slug, sub.slug, article.id)),
        lastModified: new Date(article.publishedAt),
        changeFrequency: "monthly" as const,
        // Deliberately below 1.0. Thin listicles at full priority compete with
        // the deeper pages that actually deserve crawl budget.
        priority: 0.6,
      }))
    )
  );

  const subcategories = categories.flatMap((category) =>
    category.subcategories.map((sub) => ({
      url: absoluteUrl(subcategoryPath(category.slug, sub.slug)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const categoryPages = categories.map((category) => ({
    url: absoluteUrl(categoryPath(category.slug)),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...categoryPages,
    ...subcategories,
    ...articles,
  ];
}