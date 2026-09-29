"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import { useTheme } from "@/components/ThemeProvider";
import SearchModal from "@/components/SearchModal";
import CategoryIcon from "@/components/CategoryIcon";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.8 6.8 0 0 0 9.7 9.7Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
      active
        ? "bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)]"
        : "text-gray-600 hover:bg-[var(--nav-hover)] hover:text-gray-900"
    }`;

  const iconButton =
    "flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-[var(--nav-hover)] hover:text-gray-900";

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-[var(--border-color)] backdrop-blur-xl transition-shadow ${
        scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.07)]" : ""
      }`}
      style={{ background: "var(--nav-bg)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-1 px-5 sm:gap-2 sm:px-8">

        {/* Logo */}
        <div className="flex flex-shrink-0 items-center gap-4">
          <Link href="/" className="group flex items-center gap-2.5 py-2" aria-label="HerSpace home">
            <span className="text-2xl leading-none transition-transform duration-200 group-hover:scale-110">🌸</span>
            <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              HerSpace
            </span>
          </Link>
          <span className="hidden h-7 w-px xl:block" style={{ background: "var(--border-color)" }} aria-hidden />
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center xl:ml-5 xl:flex">
          <Link href="/" prefetch className={linkClass(isActive("/"))}>
            Home
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              prefetch
              href={`/category/${c.slug}`}
              className={linkClass(isActive(`/category/${c.slug}`))}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="ml-auto flex min-w-0 flex-1 items-center md:max-w-sm md:pl-6">
          <SearchModal />
        </div>

        {/* Right actions */}
        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="#newsletter"
            className="hidden h-10 items-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 text-sm font-semibold text-white transition hover:opacity-90 sm:flex"
          >
            Subscribe
          </a>

          <button onClick={toggle}
            className="flex h-10 items-center gap-2 rounded-full bg-[var(--nav-chip)] px-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-[var(--nav-hover)] hover:text-gray-900 sm:px-3.5"
            title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            <span className="hidden whitespace-nowrap sm:inline">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`${iconButton} xl:hidden`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t border-[var(--border-color)] xl:hidden"
          style={{ background: "var(--bg-card)" }}
        >
          <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
            <div className="flex flex-col gap-0.5">
              <a
                href="#newsletter"
                onClick={() => setMobileOpen(false)}
                className="mb-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                Subscribe
              </a>
              <Link href="/" onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/")
                    ? "bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)]"
                    : "text-gray-600 hover:bg-[var(--nav-hover)] hover:text-gray-900"
                }`}
              >
                🏠 Home
              </Link>
              {categories.map((c) => (
                <Link key={c.slug} prefetch href={`/category/${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive(`/category/${c.slug}`)
                      ? "bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)]"
                      : "text-gray-600 hover:bg-[var(--nav-hover)] hover:text-gray-900"
                  }`}
                >
                  <CategoryIcon slug={c.slug} className="mr-2 inline-block h-4 w-4 align-[-2px]" /> {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
