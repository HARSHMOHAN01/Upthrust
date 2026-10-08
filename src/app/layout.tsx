import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { siteData } from "@/content/site-data";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: siteData.seo.title,
  description: siteData.seo.description,
  metadataBase: new URL(siteData.seo.siteUrl),
  alternates: {
    canonical: siteData.seo.canonical,
  },
  openGraph: {
    title: siteData.seo.openGraph.title,
    description: siteData.seo.openGraph.description,
    url: siteData.seo.siteUrl,
    siteName: siteData.brand.name,
    images: [
      {
        url: siteData.seo.openGraph.image,
        width: 1200,
        height: 630,
        alt: siteData.brand.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.seo.openGraph.title,
    description: siteData.seo.openGraph.description,
    images: [siteData.seo.openGraph.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data (JSON-LD) for Search Engine Rich Snippets */}
        <JsonLd data={siteData} />

        {/* Google Tag Manager Data Layer Fallback Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} antialiased`}>
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-md focus:shadow-lg focus:font-bold text-xs uppercase tracking-wider"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
