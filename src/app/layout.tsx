import type { Metadata } from "next";
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
const THEME_SCRIPT = `try{var t=localStorage.getItem("herspace-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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
