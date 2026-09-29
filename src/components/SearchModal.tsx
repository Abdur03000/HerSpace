"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

type Result = {
  title: string;
  description: string;
  image: string;
  href: string;
  tag: string;
};

function getAllArticles(): Result[] {
  const results: Result[] = [];
  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      for (const art of sub.articles) {
        results.push({
          title: art.title,
          description: art.description,
          image: art.image,
          href: `/category/${cat.slug}/${sub.slug}/${art.id}`,
          tag: `${cat.emoji} ${sub.name}`,
        });
      }
    }
  }
  return results;
}

const allArticles = getAllArticles();

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length < 2
    ? []
    : allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.tag.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-[var(--nav-chip)] text-base text-gray-500 transition-colors hover:bg-[var(--nav-hover)] hover:text-gray-900 sm:w-full sm:justify-start sm:px-4"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.6-3.6" />
        </svg>
        <span className="hidden truncate text-sm sm:inline">Search</span>
      </button>

      {/* Modal backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Input */}
            <div className="flex items-center gap-3 border-b border-pink-100 px-5 py-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" className="text-gray-400" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.6-3.6" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search beauty tips, animals, fashion…"
                className="flex-1 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 hover:bg-gray-200"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {query.trim().length < 2 ? (
                <div className="py-10 text-center text-sm text-gray-400">
                  Type at least 2 characters to search…
                </div>
              ) : results.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-400">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <ul className="divide-y divide-pink-50">
                  {results.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        onClick={() => { setOpen(false); setQuery(""); }}
                        className="flex items-center gap-4 px-5 py-3 transition hover:bg-pink-50"
                      >
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl">
                          <Image src={r.image} alt={r.title} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-gray-900">{r.title}</p>
                          <p className="mt-0.5 text-xs text-pink-500">{r.tag}</p>
                        </div>
                        <span className="text-gray-300">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer hint */}
            <div className="border-t border-pink-50 px-5 py-3 text-xs text-gray-400">
              {results.length > 0 ? `${results.length} results found` : "Try: skincare, cats, makeup, travel…"}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
