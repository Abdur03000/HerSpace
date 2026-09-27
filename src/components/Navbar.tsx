"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";
import { useTheme } from "@/components/ThemeProvider";
import SearchModal from "@/components/SearchModal";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-100/50 shadow-sm backdrop-blur-xl"
      style={{ background: "var(--nav-bg)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex flex-shrink-0 items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            HerSpace
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          <Link href="/"
            className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${
              isActive("/")
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md"
                : "text-gray-700 hover:bg-pink-50 hover:text-purple-600"
            }`}
          >
            Home
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${
                isActive(`/category/${c.slug}`)
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-pink-50 hover:text-purple-600"
              }`}
            >
              {c.emoji} {c.name}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex flex-shrink-0 items-center gap-2">
          {/* Search */}
          <SearchModal />

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-200 bg-pink-50 text-lg transition hover:bg-pink-100"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3 py-2 text-sm font-medium text-purple-600 transition hover:bg-pink-100 lg:hidden"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-pink-100 px-6 pb-4 lg:hidden"
          style={{ background: "var(--bg-card)" }}
        >
          <div className="flex flex-col gap-1 pt-3">
            <Link href="/" onClick={() => setMobileOpen(false)}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive("/")
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                  : "text-gray-700 hover:bg-pink-50 hover:text-purple-600"
              }`}
            >
              🏠 Home
            </Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive(`/category/${c.slug}`)
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "text-gray-700 hover:bg-pink-50 hover:text-purple-600"
                }`}
              >
                {c.emoji} {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
