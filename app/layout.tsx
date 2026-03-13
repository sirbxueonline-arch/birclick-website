import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  icons: {
    icon: "/logo5.png",
    shortcut: "/logo5.png",
    apple: "/logo5.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
