"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  // Offset + width of the active link, used to slide the gradient pill
  // behind it. Null until measured so the pill never paints in the wrong spot.
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>('[data-active="true"]');
    setPill(active ? { x: active.offsetLeft, w: active.offsetWidth } : null);
  }, [pathname]);

  useEffect(() => {
    // Measured off the critical path: web fonts land after first paint and
    // nudge the links sideways, and a resize moves them too.
    let frame = 0;
    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const list = listRef.current;
        if (!list) return;
        const active = list.querySelector<HTMLElement>('[data-active="true"]');
        setPill(active ? { x: active.offsetLeft, w: active.offsetWidth } : null);
      });
    };
    document.fonts?.ready.then(remeasure).catch(() => {});
    window.addEventListener("resize", remeasure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", remeasure);
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links = [
    { href: "/", name: "Home", icon: "🏠" },
    ...categories.map((c) => ({ href: `/category/${c.slug}`, name: c.name, slug: c.slug })),
  ];

  const controlButton =
    "flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--border-color)] bg-white px-3 text-sm font-semibold text-[var(--nav-text)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--nav-hover)] hover:shadow-md active:translate-y-0 active:scale-95 sm:px-3.5";

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Frosted strip: the bar floats below it, so this is what keeps
          scrolling content from showing through the gap. Deliberately not
          blurred — a second full-width backdrop-filter on top of the bar's
          one is what made page changes stutter. */}
      <div
        aria-hidden
        className="h-3 w-full sm:h-4"
        style={{
          background: `linear-gradient(to bottom, ${
            scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)"
          }, transparent)`,
        }}
      />

      <div className="px-3 pb-3 sm:px-5 sm:pb-4">
        <div
          className={`mx-auto flex h-16 max-w-7xl items-center gap-1 rounded-[22px] border border-[var(--border-color)] px-2.5 backdrop-blur-xl transition-shadow duration-300 sm:gap-2 sm:px-4 ${
            scrolled
              ? "shadow-[0_18px_45px_-22px_rgba(17,24,39,0.55)]"
              : "shadow-[0_10px_30px_-26px_rgba(17,24,39,0.5)]"
          }`}
          style={{
            background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
          }}
        >

          {/* Logo */}
          <Link href="/" className="hs-logo group flex flex-shrink-0 items-center gap-2.5" aria-label="HerSpace home">
            <span className="hs-logo-mark" aria-hidden>🌸</span>
            <span className="text-lg font-bold tracking-tight text-[var(--nav-text)] sm:text-xl">
              HerSpace
            </span>
          </Link>

          {/* Desktop nav with sliding indicator */}
          <div ref={listRef} className="relative ml-4 hidden h-11 items-center gap-1 xl:flex">
            <span
              aria-hidden
              className={`absolute left-0 top-0 h-11 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-[0_10px_24px_-8px_rgba(168,85,247,0.75)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                pill ? "opacity-100" : "opacity-0"
              }`}
              /* Width is set without a transition on purpose: animating it
                 relayouts the header on every frame of each page change.
                 The slide itself is a compositor-only transform. */
              style={{ transform: `translateX(${pill?.x ?? 0}px)`, width: pill?.w ?? 0 }}
            />
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch
                  data-active={active ? "true" : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-10 inline-flex h-11 items-center rounded-full px-4 text-sm transition-colors duration-200 ${
                    active
                      ? "font-semibold text-white"
                      : "font-medium text-[var(--nav-text)] hover:bg-[var(--nav-hover)]"
                  }`}
                >
                  {l.name}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end md:max-w-[240px] md:pl-4">
            <SearchModal />
          </div>

          {/* Right actions */}
          <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href="#newsletter"
              className="hs-shine hidden h-10 items-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:flex"
            >
              Subscribe
            </a>

            <button onClick={toggle}
              className={controlButton}
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
              className={`${controlButton} w-10 px-0 xl:hidden`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="px-3 sm:px-5">
          <div
            className="hs-drop mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-[var(--border-color)] p-2 shadow-[0_24px_50px_-24px_rgba(17,24,39,0.6)]"
            style={{ background: "var(--nav-bg-scrolled)" }}
          >
            <a
              href="#newsletter"
              onClick={() => setMobileOpen(false)}
              className="hs-shine mb-1 block rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Subscribe
            </a>
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`hs-drop-item flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)] font-semibold"
                      : "text-[var(--nav-text)] hover:bg-[var(--nav-hover)]"
                  }`}
                >
                  {"slug" in l ? (
                    <CategoryIcon slug={l.slug} className="mr-3 inline-block h-4 w-4 align-[-2px]" />
                  ) : (
                    <span className="mr-3 inline-block w-4 text-center" aria-hidden>🏠</span>
                  )}
                  {l.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
