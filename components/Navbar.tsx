"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ─── Logo ────────────────────────────────────────────────────────
              Renders the PNG oversized then clips the surrounding whitespace
              so the actual mark + text appears large inside a normal navbar.
              Put your file at /public/logo.png to use it.
          ──────────────────────────────────────────────────────────────── */}
          <div className="h-16 overflow-hidden flex items-center">
            <Image
              src="/logo.png"
              alt="BirClick"
              width={600}
              height={600}
              className="w-auto object-contain"
              style={{ height: "155px", marginTop: "-44px", marginBottom: "-44px" }}
              priority
            />
          </div>

          {/* Language switcher + CTA */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={scrollToWaitlist}
              className="text-white px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold
                hover:opacity-90 hover:shadow-lg hover:scale-105 transition-all duration-200
                whitespace-nowrap"
              style={{ backgroundColor: "#3B3BFF" }}
            >
              <span className="sm:hidden">
                {lang === "ru" ? "Вступить" : "Qoşul"}
              </span>
              <span className="hidden sm:inline">{t.nav.join}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
