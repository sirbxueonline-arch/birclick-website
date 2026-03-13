"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("bc_cookie_consent");
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (value: "accepted" | "declined") => {
    try { localStorage.setItem("bc_cookie_consent", value); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between
        flex-wrap gap-4 px-5 py-4 bg-gray-950 border-t border-white/10
        text-white text-sm shadow-2xl"
    >
      <p className="text-white/70 max-w-xl leading-snug">{t.cookie.text}</p>
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => save("declined")}
          className="px-4 py-2 rounded-full border border-white/20 text-white/50
            hover:text-white hover:border-white/40 transition-all duration-200 text-xs font-medium"
        >
          {t.cookie.decline}
        </button>
        <button
          onClick={() => save("accepted")}
          className="px-4 py-2 rounded-full text-white text-xs font-bold
            hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#3B3BFF" }}
        >
          {t.cookie.accept}
        </button>
      </div>
    </div>
  );
}
