import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import CategoryIcon from "@/components/CategoryIcon";
import {
  breadcrumbListJsonLd,
  categoryPath,
  clampDescription,
  collectionJsonLd,
  subcategoryPath,
} from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return { title: "Category Not Found", robots: { index: false, follow: false } };
  }

  const topicNames = category.subcategories.map((s) => s.name);
  const description = clampDescription(
    `${category.description} Browse ${topicNames.length} topics — ${topicNames
      .slice(0, 5)
      .join(", ")} — with practical guides and ideas.`
  );

  return {
    title: `${category.name} — Tips, Guides & Ideas`,
    description,
    keywords: [
      category.name.toLowerCase(),
      ...topicNames.map((name) => name.toLowerCase()),
      `${category.name.toLowerCase()} tips`,
      `${category.name.toLowerCase()} guide`,
    ],
    alternates: { canonical: categoryPath(slug) },
    openGraph: {
      type: "website",
      title: `${category.name} — Tips, Guides & Ideas | HerSpace`,
      description,
      url: categoryPath(slug),
      images: [{ url: category.image, width: 1600, height: 900, alt: category.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} — Tips, Guides & Ideas | HerSpace`,
      description,
      images: [category.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  // Previously this rendered a friendly "Category Not Found" page with a
  // 200 status, which told Google the URL was valid content. A real 404 stops
  // invalid URLs from being indexed.
  if (!category) notFound();

  const trail = [{ name: category.name, path: categoryPath(category.slug) }];

  return (
    <main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: collectionJsonLd({
            name: `${category.name} — Tips, Guides & Ideas`,
            description: category.description,
            path: categoryPath(slug),
            items: category.subcategories.map((s) => ({
              name: s.name,
              path: subcategoryPath(category.slug, s.slug),
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbListJsonLd(trail) }}
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="relative h-80 md:h-96">
          <Image
            src={category.image}
            alt={`${category.name} — ${category.description}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-10">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
            >
              ← Home
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                <CategoryIcon slug={category.slug} className="h-9 w-9" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-pink-300">
                  Category
                </p>
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  {category.name}
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Sub-categories Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
            Browse Topics
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Explore {category.name}
          </h2>
          <p className="mt-2 text-gray-500">
            Choose a topic to discover articles, tips and inspiration
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/category/${category.slug}/${subcategory.slug}`}
              className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={subcategory.image}
                  alt={`${subcategory.name} articles and guides`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-purple-600 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                  {subcategory.articles?.length ?? 0} articles
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-purple-600">
                    {subcategory.name}
                  </h3>
                  <span className="mt-1 flex-shrink-0 text-xl text-gray-300 transition group-hover:translate-x-1 group-hover:text-purple-500">
                    →
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {subcategory.description}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-20" />
                  <span className="text-sm font-semibold text-purple-600 opacity-0 transition group-hover:opacity-100">
                    Explore
                  </span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </section>

      {/* More Categories Banner */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-8 text-xl font-bold text-gray-900">
            Explore Other Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:text-purple-600 hover:shadow-md"
                >
                  <CategoryIcon slug={c.slug} className="mr-1.5 inline-block h-4 w-4 align-[-2px]" /> {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

    </main>
  );
}
