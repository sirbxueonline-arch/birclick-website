"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ServicesSection() {
  const { t } = useLanguage();
  const { eyebrow, title, sub, fromLabel, soon, items } = t.services;

  return (
    <section className="py-16 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#3B3BFF" }}>
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 mt-3">
            {title}
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">{sub}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {items.map((s) => (
            <div
              key={s.name}
              className={`group ${s.bgClass} ${s.hoverBorderClass}
                rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center
                cursor-pointer border-2 border-transparent
                hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
            >
              <span className="text-4xl sm:text-5xl mb-3 sm:mb-4 block group-hover:scale-125 transition-transform duration-200 select-none">
                {s.emoji}
              </span>
              <h3 className="font-bold text-gray-900 text-base mb-1 leading-tight">{s.name}</h3>
              <p className="text-sm text-gray-400 font-medium">{s.price}{fromLabel}</p>
            </div>
          ))}
        </div>

        {/* Coming-soon blurred placeholders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {["🏗️", "🍳", "🐾"].map((emoji, i) => (
            <div
              key={i}
              className="relative rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center
                bg-gray-100 border-2 border-dashed border-gray-200 overflow-hidden"
            >
              <span className="text-4xl sm:text-5xl mb-3 sm:mb-4 block select-none opacity-30">{emoji}</span>
              <div className="h-3 w-20 bg-gray-200 rounded-full mb-2" />
              <div className="h-2 w-14 bg-gray-200 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ backdropFilter: "blur(2px)" }}>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: "#3B3BFF" }}>
                  {soon}
                </span>
              </div>
            </div>
          ))}
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
