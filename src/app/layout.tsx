import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "HerSpace — Beauty, Fashion, Lifestyle & More",
  description: "Discover beauty tips, fashion inspiration, lifestyle ideas, food recipes, animal love and travel dreams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900">
        <ThemeProvider>
          <ScrollToTop />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
