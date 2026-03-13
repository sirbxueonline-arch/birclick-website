const stats = [
  {
    icon: "🆓",
    value: "0 ₼",
    label: "Qeydiyyat haqqı yoxdur",
  },
  {
    icon: "⚡",
    value: "Saniyələr",
    label: "içində işçi tap",
  },
  {
    icon: "📍",
    value: "Bakı",
    label: "İlk şəhər — tezliklə genişlənir",
  },
  {
    icon: "🔒",
    value: "Etibarlı",
    label: "Rəylər ilə yoxlanılmış işçilər",
  },
];

export default function StatsSection() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-gray-100">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col sm:flex-row items-center sm:items-start
                gap-3 px-4 sm:px-6 py-6 sm:py-7 hover:bg-white transition-colors duration-200
                ${i < 2 ? "border-b border-gray-100 lg:border-b-0" : ""}`}
            >
              <span className="text-2xl select-none">{s.icon}</span>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-black text-gray-900 tracking-tight leading-tight">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-snug">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
