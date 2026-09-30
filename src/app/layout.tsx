import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "HerSpace — Beauty, Fashion, Lifestyle & More",
  description: "Discover beauty tips, fashion inspiration, lifestyle ideas, food recipes, animal love and travel dreams.",
};

// Applies the stored theme before first paint. Without this the theme is only
// set in a post-hydration effect, which shows a white flash on every load.
// Light is the default for anyone who has not picked a theme yet; the OS
// `prefers-color-scheme` setting is deliberately not consulted, so a machine
// set to dark still lands on the light site on a first visit.
const THEME_SCRIPT = `try{var t=localStorage.getItem("herspace-theme");if(t!=="light"&&t!=="dark"){t="light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* beforeInteractive so it runs before first paint; a raw <script>
            in the tree is dropped on client re-renders, which React warns about. */}
        <Script id="herspace-theme" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
      </head>
      <body className="text-gray-900">
        <ThemeProvider>
          <ScrollToTop />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
