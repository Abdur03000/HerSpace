import Link from "next/link";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-pink-100 bg-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🌸</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                HerSpace
              </span>
            </Link>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              A beautiful space for every woman — discover beauty tips, fashion inspiration, animal love, food recipes, travel ideas and more.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition hover:bg-pink-500 hover:text-white"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition hover:bg-pink-500 hover:text-white"
                aria-label="Pinterest"
              >
                📌
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition hover:bg-pink-500 hover:text-white"
                aria-label="YouTube"
              >
                🎬
              </a>
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
                    className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-purple-600"
                  >
                    <span>{category.emoji}</span>
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
                <Link href="/" className="text-sm text-gray-500 transition hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="text-sm text-gray-500 transition hover:text-purple-600">
                  Beauty Guide
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" className="text-sm text-gray-500 transition hover:text-purple-600">
                  Fashion Trends
                </Link>
              </li>
              <li>
                <Link href="/category/lifestyle" className="text-sm text-gray-500 transition hover:text-purple-600">
                  Lifestyle Tips
                </Link>
              </li>
              <li>
                <Link href="/category/food" className="text-sm text-gray-500 transition hover:text-purple-600">
                  Food & Recipes
                </Link>
              </li>
              <li>
                <Link href="/category/travel" className="text-sm text-gray-500 transition hover:text-purple-600">
                  Travel Dreams
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-gray-900">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm leading-6 text-gray-500">
              Get the latest beauty tips, fashion trends and lifestyle inspiration delivered to your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              />
              <button className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Subscribe ✨
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-100 bg-pink-50/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">

          <p className="text-sm text-gray-500">
            © 2024 <span className="font-semibold text-purple-600">HerSpace</span>. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Terms of Use</a>
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600">Contact</a>
          </div>

        </div>
      </div>

    </footer>
  );
}
