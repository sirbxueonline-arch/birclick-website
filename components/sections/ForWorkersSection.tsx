"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ForWorkersSection() {
  const { t } = useLanguage();
  const fw = t.forWorkers;

  return (
    <section className="py-16 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#3B3BFF" }}>
            {fw.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 mt-3">
            {fw.title} <br className="hidden sm:block" />
            <span style={{ color: "#3B3BFF" }}>{fw.titleAccent}</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">{fw.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Customer card */}
          <div className="bg-gray-950 rounded-3xl p-6 sm:p-8 text-white">
            <div className="text-4xl mb-5">🛒</div>
            <h3 className="text-2xl font-black mb-2">{fw.customerTitle}</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">{fw.customerSub}</p>
            <ul className="space-y-3">
              {fw.customerBenefits.map((b) => (
                <li key={b.text} className="flex items-center gap-3">
                  <span className="text-xl w-7 flex-shrink-0">{b.icon}</span>
                  <span className="text-gray-300 text-sm font-medium">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Worker card */}
          <div
            className="rounded-3xl p-6 sm:p-8 text-white"
            style={{
              background: "linear-gradient(135deg, #3B3BFF 0%, #6060FF 100%)",
              boxShadow: "0 20px 60px rgba(59,59,255,0.3)",
            }}
          >
            <div className="text-4xl mb-5">💼</div>
            <h3 className="text-2xl font-black mb-2">{fw.workerTitle}</h3>
            <p className="text-white/70 text-sm mb-8 leading-relaxed">{fw.workerSub}</p>
            <ul className="space-y-3">
              {fw.workerBenefits.map((b) => (
                <li key={b.text} className="flex items-center gap-3">
                  <span className="text-xl w-7 flex-shrink-0">{b.icon}</span>
                  <span className="text-white/80 text-sm font-medium">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3
              rounded-full text-white transition-all duration-200
              hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#3B3BFF" }}
          >
            {fw.ctaText}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
