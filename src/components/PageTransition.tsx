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
      {/* Clips the slide to the viewport. The animated child is a full-bleed
          block, so translating it sideways pushed its border box past the
          right edge of the document. That made the page genuinely wider
          than the screen, which on a phone let the visual viewport pan
          sideways and left the new page rendering with its left edge cut
          off — worst when tapping a link far down the page, because the
          whole document shifted at once. `clip` (not `hidden`) is used so
          this stays a clip context and not a scroll container, leaving the
          sticky navbar and the vertical scroll untouched. */}
      <div className="hs-page-clip">
        <div key={pathname} className={`hs-page-enter hs-page-enter--${nav.dir}`}>
          {children}
        </div>
      </div>
      <div key={`sweep-${pathname}`} className="hs-sweep" aria-hidden="true" />
    </>
  );
}
