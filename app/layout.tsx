import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://birclick.az"),
  title: "BirClick — Azərbaycan üçün xidmət platforması",
  description:
    "İşçiləri bir kliklə tap. Azərbaycanda santexnik, elektrik, təmizlikçi, sürücü və digər işçiləri saatlıq və ya günlük işə götürün.",
  keywords: [
    "xidmət platforması",
    "Azərbaycan",
    "işçi tap",
    "santexnik",
    "elektrik",
    "təmizlikçi",
    "saatlıq iş",
    "BirClick",
  ],
  icons: {
    icon: "/logo5.png",
    shortcut: "/logo5.png",
    apple: "/logo5.png",
  },
  openGraph: {
    title: "BirClick — Azərbaycan üçün xidmət platforması",
    description:
      "İşçiləri bir kliklə tap. Xidmət yayımla, kəşf edilin, dərhal sifariş et.",
    type: "website",
    url: "https://birclick.az",
    siteName: "BirClick",
    locale: "az_AZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "BirClick — Azərbaycan üçün xidmət platforması",
    description: "İşçiləri bir kliklə tap.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── JSON-LD Structured Data ─────────────────────────────── */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BirClick",
    url: "https://birclick.az",
    description:
      "İşçiləri bir kliklə tap. Azərbaycanda santexnik, elektrik, təmizlikçi və digər işçiləri tapın.",
    inLanguage: "az-AZ",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://birclick.az/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BirClick",
    url: "https://birclick.az",
    logo: "https://birclick.az/logo.png",
    description:
      "Azərbaycanda saatlıq və günlük xidmətlər üçün platforma.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@birclick.az",
      contactType: "customer service",
    },
    areaServed: {
      "@type": "City",
      name: "Baku",
      containedInPlace: { "@type": "Country", name: "Azerbaijan" },
    },
    sameAs: ["https://instagram.com/birclick.aze"],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
