import Link from "next/link";
import { categories } from "@/data/categories";
import NewsletterForm from "@/components/NewsletterForm";
import CategoryIcon from "@/components/CategoryIcon";

/* Placeholder social profiles. Set NEXT_PUBLIC_INSTAGRAM_URL,
   NEXT_PUBLIC_PINTEREST_URL and NEXT_PUBLIC_YOUTUBE_URL in the deploy env to
   switch these from inert chips to real outbound links — entries without a URL
   render as plain icons so the page has no dead anchors. */
const socialLinks = [
  {
    name: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "Pinterest",
    href: process.env.NEXT_PUBLIC_PINTEREST_URL,
    path: (
      <path
        d="M12 2a10 10 0 0 0-3.65 19.31c-.03-.78-.01-1.72.14-2.5l1.2-5.1s-.3-.6-.3-1.5c0-1.4.82-2.45 1.84-2.45.87 0 1.29.65 1.29 1.43 0 .87-.55 2.18-.84 3.39-.24 1.02.51 1.85 1.51 1.85 1.82 0 3.22-1.92 3.22-4.7 0-2.46-1.76-4.18-4.29-4.18-2.92 0-4.64 2.19-4.64 4.45 0 .88.34 1.83.76 2.35a.3.3 0 0 1 .07.29c-.08.32-.25 1-.29 1.15-.05.19-.15.23-.35.14-1.28-.6-2.08-2.47-2.08-3.98 0-3.24 2.35-6.21 6.79-6.21 3.56 0 6.33 2.54 6.33 5.93 0 3.54-2.23 6.39-5.32 6.39-1.04 0-2.02-.54-2.35-1.18l-.64 2.44c-.23.89-.86 2.01-1.28 2.69A10 10 0 1 0 12 2Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
  {
    name: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL,
    path: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-color)] bg-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 py-1">
              <span className="text-3xl leading-none">🌸</span>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                HerSpace
              </span>
            </Link>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              A beautiful space for every woman — discover beauty tips, fashion inspiration, animal love, food recipes, travel ideas and more.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((s) => {
                const icon = (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {s.path}
                  </svg>
                );
                const base =
                  "flex h-10 w-10 items-center justify-center rounded-full bg-[var(--nav-chip)] text-gray-600 transition-colors hover:bg-[var(--nav-hover)] hover:text-gray-900";

                // No configured profile means no anchor. href="#" is a dead
                // link that crawlers count as an internal reference.
                return s.href ? (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={`HerSpace on ${s.name}`}
                    rel="me noopener noreferrer"
                    target="_blank"
                    className={base}
                  >
                    {icon}
                  </a>
                ) : (
                  <span
                    key={s.name}
                    aria-hidden
                    title={`${s.name} coming soon`}
                    className={`${base} cursor-default opacity-60`}
                  >
                    {icon}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-gray-900">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-2 py-2 text-sm text-gray-500 transition hover:text-purple-600"
                  >
                    <CategoryIcon slug={category.slug} className="h-4 w-4 flex-shrink-0" />
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-gray-900">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="inline-block py-2 text-sm text-gray-500 transition hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="inline-block py-2 text-sm text-gray-500 transition hover:text-purple-600">
                  Beauty Guide
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" className="inline-block py-2 text-sm text-gray-500 transition hover:text-purple-600">
                  Fashion Trends
                </Link>
              </li>
              <li>
                <Link href="/category/lifestyle" className="inline-block py-2 text-sm text-gray-500 transition hover:text-purple-600">
                  Lifestyle Tips
                </Link>
              </li>
              <li>
                <Link href="/category/food" className="inline-block py-2 text-sm text-gray-500 transition hover:text-purple-600">
                  Food & Recipes
                </Link>
              </li>
              <li>
                <Link href="/category/travel" className="inline-block py-2 text-sm text-gray-500 transition hover:text-purple-600">
                  Travel Dreams
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div id="newsletter" className="scroll-mt-24">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-gray-900">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm leading-6 text-gray-500">
              Get the latest beauty tips, fashion trends and lifestyle inspiration delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-color)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="font-semibold text-gray-900">HerSpace</span>. All rights reserved.
          </p>

          {/* The previous Privacy / Terms / Contact row pointed all three
              anchors at "#". Real pages need real copy, so rather than ship
              placeholders that read as dead links they are left out until the
              content exists. */}

        </div>
      </div>

    </footer>
  );
}
