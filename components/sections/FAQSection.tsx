"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left
          group hover:text-[#3B3BFF] transition-colors duration-200"
      >
        <span className="font-semibold text-gray-900 group-hover:text-[#3B3BFF]
          transition-colors pr-4 sm:pr-8 text-sm sm:text-base">
          {q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-gray-200
            flex items-center justify-center transition-all duration-200"
          style={open ? { borderColor: "#3B3BFF", backgroundColor: "#3B3BFF" } : {}}
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300"
            style={{ color: open ? "#fff" : "#9ca3af", transform: open ? "rotate(45deg)" : "none" }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      {/* Smooth expand with CSS grid trick */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p className="text-gray-500 leading-relaxed pb-5 text-sm pr-4 sm:pr-8">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { t } = useLanguage();
  const { eyebrow, title, sub, subLink, subLinkSuffix, items } = t.faq;

  return (
    <section className="py-16 sm:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#3B3BFF" }}>
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 mt-3">
            {title}
          </h2>
          <p className="text-gray-400 mt-4">
            {sub}{" "}
            <a
              href="https://instagram.com/birclick.aze"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
              style={{ color: "#3B3BFF" }}
            >
              {subLink}
            </a>
            {subLinkSuffix}
          </p>
        </div>

        <div className="bg-white rounded-3xl px-5 sm:px-8 shadow-sm border border-gray-100">
          {items.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
