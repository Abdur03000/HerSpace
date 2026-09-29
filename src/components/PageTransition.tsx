"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

const slugs = categories.map((c) => c.slug);

// Position of a route along the nav, so the page slides the way the user travelled.
function rank(pathname: string) {
  const seg = pathname.split("/").filter(Boolean);
  if (seg.length === 0) return 0;
  const i = seg.indexOf("category");
  const slug = i >= 0 ? seg[i + 1] : seg[0];
  const at = slugs.indexOf(slug);
  return at >= 0 ? at + 1 : slugs.length + 1;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [nav, setNav] = useState({ path: pathname, dir: "fwd" as "fwd" | "back" });

  // Adjusting state during render (React's documented pattern) keeps the
  // direction correct for the very first paint, without reading a ref.
  if (nav.path !== pathname) {
    setNav({ path: pathname, dir: rank(pathname) >= rank(nav.path) ? "fwd" : "back" });
  }

  return (
    <>
      <div key={pathname} className={`hs-page-enter hs-page-enter--${nav.dir}`}>
        {children}
      </div>
      <div key={`sweep-${pathname}`} className="hs-sweep" aria-hidden="true" />
    </>
  );
}
