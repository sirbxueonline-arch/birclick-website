"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Yuxarıya qayıt"
      className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full
        flex items-center justify-center text-white shadow-xl
        hover:scale-110 hover:opacity-90 transition-all duration-300"
      style={{
        backgroundColor: "#3B3BFF",
        boxShadow: "0 4px 20px rgba(59,59,255,0.4)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
