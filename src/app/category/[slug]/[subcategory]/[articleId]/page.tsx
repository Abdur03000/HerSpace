import React from "react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { notFound } from "next/navigation";
import CategoryIcon from "@/components/CategoryIcon";

type ArticlePageProps = {
  params: Promise<{ slug: string; subcategory: string; articleId: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, subcategory, articleId } = await params;

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const sub = category.subcategories.find((s) => s.slug === subcategory);
  if (!sub) notFound();

  const article = sub.articles.find((a) => a.id === Number(articleId));
  if (!article) notFound();

  const otherArticles = sub.articles.filter((a) => a.id !== article.id).slice(0, 4);

  // pick a mid-article paragraph as a pull quote
  const pullQuoteIndex = Math.floor(article.content.length / 2);
  const pullQuote = article.content[pullQuoteIndex];

  return (
    <main className="min-h-screen">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative h-[460px] md:h-[580px] w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          {/* multi-stop gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          {/* subtle top-left colour wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-5xl px-6 pb-14">

            {/* Breadcrumb */}
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/55">
              <Link href="/" className="py-2 transition hover:text-white">Home</Link>
              <span className="text-white/30">›</span>
              <Link href={`/category/${slug}`} className="py-2 transition hover:text-white">
                <CategoryIcon slug={category.slug} className="mr-1.5 inline-block h-4 w-4 align-[-2px]" /> {category.name}
              </Link>
              <span className="text-white/30">›</span>
              <Link href={`/category/${slug}/${subcategory}`} className="py-2 transition hover:text-white">
                {sub.name}
              </Link>
            </nav>

            {/* Pill tags */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow">
                {sub.name}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                📖 {article.readTime}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                ✍️ {article.author}
              </span>
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              {article.description}
            </p>

          </div>
        </div>
      </section>

      {/* ── BODY ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">

          {/* ── MAIN CONTENT ─────────────────────────────── */}
          <article className="min-w-0">

            {/* Featured image repeated for inline richness */}
            <div className="relative mb-10 h-72 overflow-hidden rounded-3xl shadow-xl md:h-96">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article paragraphs with pull-quote inserted mid-way */}
            <div className="space-y-6">
              {article.content.map((paragraph, i) => (
                <React.Fragment key={i}>
                  <p
                    className={`leading-[1.9] ${
                      i === 0
                        ? "text-xl font-medium text-gray-800 first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-black first-letter:text-purple-600 first-letter:leading-[0.8]"
                        : "text-[15px] text-gray-700"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(
                        /^(Step \d+[^:—–]*[—–:]|Tip \d+[^:—–]*[—–:]|Ingredients[^:]*:|[A-Z][^—–]*[—–])/,
                        "<strong class='text-gray-900'>$1</strong>"
                      ),
                    }}
                  />

                  {i === pullQuoteIndex && article.content.length > 3 && (
                    <blockquote className="relative my-8 rounded-2xl border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 px-7 py-6 shadow-sm">
                      <span className="absolute -top-3 left-5 text-5xl font-black text-purple-200 leading-none select-none">
                        &ldquo;
                      </span>
                      <p className="text-lg font-semibold italic leading-8 text-purple-800">
                        {pullQuote.length > 160 ? pullQuote.slice(0, 157) + "…" : pullQuote}
                      </p>
                    </blockquote>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Key Takeaways box */}
            <div className="mt-12 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-white shadow-xl shadow-purple-200">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <span>✨</span> Key Takeaways
              </h2>
              <ul className="space-y-3">
                {article.content.slice(1, 5).map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-6 text-white/90">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/25 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>
                      {point.length > 120 ? point.slice(0, 117) + "…" : point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo Gallery */}
            {article.images && article.images.length > 1 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  📸 Photo Gallery
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {article.images.map((img, i) => (
                    <div
                      key={i}
                      className={`relative overflow-hidden rounded-2xl shadow-md ${
                        i === 0 ? "sm:col-span-2 h-72" : "h-52"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${article.title} — photo ${i + 1}`}
                        fill
                        className="object-cover transition duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-pink-100 pt-8">
              <Link
                href={`/category/${slug}/${subcategory}`}
                className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-6 py-3 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-pink-50 hover:shadow-md"
              >
                ← More {sub.name} Articles
              </Link>
              <Link
                href={`/category/${slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:opacity-90"
              >
                All {category.name} <CategoryIcon slug={category.slug} className="inline-block h-5 w-5 align-[-3px]" />
              </Link>
            </div>

          </article>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">

            {/* Article meta card */}
            <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
              <div className="relative h-36">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white">
                    {sub.name}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { icon: "✍️", label: "Author", value: article.author },
                  { icon: "📖", label: "Read Time", value: article.readTime },
                  { icon: category.emoji, label: "Category", value: category.name },
                  { icon: "🗂️", label: "Topic", value: sub.name },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-50 text-sm">
                      {icon}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400">{label}</p>
                      <p className="text-sm font-semibold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* More articles */}
            {otherArticles.length > 0 && (
              <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                  More in {sub.name}
                </h3>
                <div className="space-y-4">
                  {otherArticles.map((a) => (
                    <Link
                      key={a.id}
                      href={`/category/${slug}/${subcategory}/${a.id}`}
                      className="group flex gap-3"
                    >
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover transition group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-5 text-gray-800 transition group-hover:text-purple-600 line-clamp-2">
                          {a.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">{a.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/category/${slug}/${subcategory}`}
                  className="mt-5 block rounded-xl bg-pink-50 py-2.5 text-center text-xs font-bold text-purple-600 transition hover:bg-pink-100"
                >
                  View All {sub.name} Articles →
                </Link>
              </div>
            )}

            {/* Explore other categories */}
            <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Explore More
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.filter((c) => c.slug !== slug).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="flex items-center gap-1.5 rounded-full border border-pink-100 px-3 py-2.5 text-xs font-medium text-gray-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                  >
                    <CategoryIcon slug={c.slug} className="mr-1 inline-block h-3.5 w-3.5 align-[-1px]" /> {c.name}
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>

      {/* ── RELATED ARTICLES (full-width) ──────────────── */}
      {otherArticles.length > 0 && (
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                  Keep Reading
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  More {sub.name} Articles
                </h2>
              </div>
              <Link
                href={`/category/${slug}/${subcategory}`}
                className="hidden rounded-full border border-pink-200 bg-white px-5 py-2 text-sm font-semibold text-purple-600 transition hover:bg-pink-50 sm:block"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {otherArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/category/${slug}/${subcategory}/${a.id}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold leading-5 text-gray-900 transition group-hover:text-purple-600 line-clamp-2">
                      {a.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{a.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
