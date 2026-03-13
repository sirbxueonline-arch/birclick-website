const customerBenefits = [
  { icon: "🔍", text: "Yaxınlıqdakı işçiləri tap" },
  { icon: "💰", text: "Qiymətləri müqayisə et" },
  { icon: "⚡", text: "Saniyələr içində sifariş et" },
  { icon: "⭐", text: "Rəylərə əsasən seç" },
];

const workerBenefits = [
  { icon: "📋", text: "Pulsuz elan yayımla" },
  { icon: "📍", text: "Yaxınlıqdakı müştəriləri tap" },
  { icon: "💵", text: "Öz qiymətini özün təyin et" },
  { icon: "🏆", text: "Reputasiyaını inkişaf etdir" },
];

export default function ForWorkersSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#3B3BFF" }}
          >
            Hər iki tərəf üçün
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mt-3">
            Müştəri də, işçi də <br className="hidden sm:block" />
            qazanır.
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            BirClick xidmət axtaranları peşəkar işçilərlə birləşdirir.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Customer card */}
          <div className="bg-gray-950 rounded-3xl p-8 text-white">
            <div className="text-4xl mb-5">🛒</div>
            <h3 className="text-2xl font-black mb-2">Müştəri üçün</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Eviniz, avtomobiliniz və ya işiniz üçün etibarlı işçi tapın.
            </p>
            <ul className="space-y-3">
              {customerBenefits.map((b) => (
                <li key={b.text} className="flex items-center gap-3">
                  <span className="text-xl w-7 flex-shrink-0">{b.icon}</span>
                  <span className="text-gray-300 text-sm font-medium">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Worker card */}
          <div
            className="rounded-3xl p-8 text-white"
            style={{
              background: "linear-gradient(135deg, #3B3BFF 0%, #6060FF 100%)",
              boxShadow: "0 20px 60px rgba(59,59,255,0.3)",
            }}
          >
            <div className="text-4xl mb-5">💼</div>
            <h3 className="text-2xl font-black mb-2">İşçi üçün</h3>
            <p className="text-white/70 text-sm mb-8 leading-relaxed">
              Bacarıqlarınızı pula çevirin. Öz qrafikinizlə işləyin.
            </p>
            <ul className="space-y-3">
              {workerBenefits.map((b) => (
                <li key={b.text} className="flex items-center gap-3">
                  <span className="text-xl w-7 flex-shrink-0">{b.icon}</span>
                  <span className="text-white/80 text-sm font-medium">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3
              rounded-full text-white transition-all duration-200
              hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#3B3BFF" }}
          >
            Gözləmə siyahısına qoşul
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
