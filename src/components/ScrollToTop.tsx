"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // `left` matters as much as `top` here. The page-transition wrapper
    // slides the page sideways for ~240ms, and before globals.css clips
    // the inline axis that briefly makes the document horizontally
    // scrollable, so a touch drag mid-navigation could leave the page
    // panned. Resetting only `top` carried that offset onto the next
    // page, which then rendered cut off on the left.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
