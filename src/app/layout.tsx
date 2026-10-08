import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { siteData } from "@/content/site-data";

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
        {/* Google Tag Manager Data Layer Fallback Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
