import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import { siteConfig, siteUrl, websiteJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HerSpace — Beauty, Fashion, Lifestyle & More",
    // Every child route sets a bare title and gets the brand appended, so a
    // subcategory reads "Skincare" rather than repeating "HerSpace" six times.
    template: "%s | HerSpace",
  },
  description:
    "Discover beauty tips, fashion inspiration, lifestyle ideas, food recipes, animal love and travel dreams.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "beauty tips",
    "skincare routine",
    "makeup guides",
    "fashion inspiration",
    "outfit ideas",
    "lifestyle tips",
    "self care",
    "recipes",
    "travel destinations",
    "cat care",
    "dog care",
  ],
  category: "lifestyle",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteUrl,
    title: "HerSpace — Beauty, Fashion, Lifestyle & More",
    description:
      "Beauty, fashion, lifestyle, food, animal and travel ideas — one space for every woman.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HerSpace — Beauty, Fashion, Lifestyle & More",
    description:
      "Beauty, fashion, lifestyle, food, animal and travel ideas — one space for every woman.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
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
          {/* Site-level WebSite/Organization entity. Child routes add their own
              Article and BreadcrumbList graphs on top of this. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: websiteJsonLd() }}
          />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
