import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import ArticleCard from "@/components/ArticleCard";
import SectionTitle from "@/components/SectionTitle";
import CategoryIcon from "@/components/CategoryIcon";
import {
  articlePath,
  breadcrumbListJsonLd,
  categoryPath,
  clampDescription,
  collectionJsonLd,
  subcategoryPath,
} from "@/lib/site";

type SubcategoryPageProps = {
  params: Promise<{ slug: string; subcategory: string }>;
};

export function generateStaticParams() {
  return categories.flatMap((category) =>
    category.subcategories.map((sub) => ({
      slug: category.slug,
      subcategory: sub.slug,
    }))
  );
}

function resolveSubcategory(slug: string, subcategory: string) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) return null;

  const sub = category.subcategories.find((item) => item.slug === subcategory);
  if (!sub) return null;

  return { category, sub };
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { slug, subcategory } = await params;
  const resolved = resolveSubcategory(slug, subcategory);

  if (!resolved) {
    return { title: "Topic Not Found", robots: { index: false, follow: false } };
  }

  const { category, sub } = resolved;
  const description = clampDescription(
    `${sub.description} ${sub.articles.length} practical ${sub.name.toLowerCase()} articles from HerSpace.`
  );
  const path = subcategoryPath(slug, subcategory);

  return {
    title: `${sub.name} Guides & Ideas`,
    description,
    keywords: [
      `${sub.name.toLowerCase()} tips`,
      `${sub.name.toLowerCase()} ideas`,
      `${sub.name.toLowerCase()} guide`,
      category.name.toLowerCase(),
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${sub.name} Guides & Ideas | HerSpace`,
      description,
      url: path,
      images: [{ url: sub.image, width: 1600, height: 900, alt: sub.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sub.name} Guides & Ideas | HerSpace`,
      description,
      images: [sub.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug, subcategory } = await params;

  // Both failure branches used to return 200-status placeholder pages. Real
  // 404s keep junk URLs out of the index.
  const resolved = resolveSubcategory(slug, subcategory);
  if (!resolved) notFound();

  const { category, sub: currentSubcategory } = resolved!;

  const articles = currentSubcategory.articles ?? [];

  const trail = [
    { name: category.name, path: categoryPath(category.slug) },
    {
      name: currentSubcategory.name,
      path: subcategoryPath(category.slug, currentSubcategory.slug),
    },
  ];

  return (
    <main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: collectionJsonLd({
            name: `${currentSubcategory.name} Guides & Ideas`,
            description: currentSubcategory.description,
            path: subcategoryPath(slug, subcategory),
            items: articles.map((article) => ({
              name: article.title,
              path: articlePath(slug, subcategory, article.id),
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbListJsonLd(trail) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-80 md:h-96">
          <Image
            src={currentSubcategory.image}
            alt={`${currentSubcategory.name} — ${currentSubcategory.description}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-10">

            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-white/70">
              <Link href="/" className="py-2 hover:text-white">Home</Link>
              <span>›</span>
              <Link href={`/category/${category.slug}`} className="py-2 hover:text-white">
                <CategoryIcon slug={category.slug} className="mr-1.5 inline-block h-4 w-4 align-[-2px]" /> {category.name}
              </Link>
              <span>›</span>
              <span className="text-white font-medium">{currentSubcategory.name}</span>
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-pink-300">
              {category.name}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
              {currentSubcategory.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
              {currentSubcategory.description}
            </p>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                📖 {articles.length} Articles
              </div>
              <Link
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/30"
              >
                ← Back to {category.name}
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10">
          <SectionTitle
            label="Articles & Inspiration"
            title={`${currentSubcategory.name} — All Articles`}
          />
        </div>

        {articles.length === 0 ? (
          <div className="rounded-3xl border border-pink-100 bg-white p-16 text-center shadow-sm">
            <div className="text-6xl">🌸</div>
            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              Coming Soon!
            </h3>
            <p className="mt-3 text-gray-500">
              Amazing content for {currentSubcategory.name} is on its way. Check back soon!
            </p>
            <Link
              href={`/category/${category.slug}`}
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white"
            >
              Explore Other Topics
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                description={article.description}
                image={article.image}
                tag={currentSubcategory.name}
                href={`/category/${slug}/${subcategory}/${article.id}`}
                readTime={"readTime" in article ? (article as {readTime: string}).readTime : undefined}
                author={"author" in article ? (article as {author: string}).author : undefined}
              />
            ))}
          </div>
        )}

      </section>

      {/* Other Sub-categories in same category */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-8 text-xl font-bold text-gray-900">
            More in {category.name}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {category.subcategories
              .filter((s) => s.slug !== subcategory)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/category/${category.slug}/${s.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={`More ${s.name} articles`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <p className="font-bold text-white text-sm">{s.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </main>
  );
}
