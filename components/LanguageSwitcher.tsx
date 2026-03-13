"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { Lang } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center rounded-full p-0.5 gap-0.5"
      style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
    >
      {(["az", "ru"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
            transition-all duration-200 select-none ${
              lang === l
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400 hover:text-gray-700"
            }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
