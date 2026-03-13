const steps = [
  {
    number: "01",
    title: "Xidmət yerləşdir",
    description:
      "İşçilər qiymət, boş vaxt cədvəli və bacarıqlarının təsviri ilə elan yaradır.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Kəşf edilin",
    description:
      "Müştərilər bacarıq, qiymət və məkana görə yerli işçiləri axtarır və tapır.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Dərhal sifariş et",
    description:
      "Saniyələr içində əlaqə saxla və işçi işə götür. Vasitəçi yoxdur, komissiya yoxdur.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#3B3BFF" }}
          >
            Necə işləyir
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mt-3">
            1, 2, 3 qədər sadə.
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-md mx-auto">
            Hesab açmağa ehtiyac yoxdur. Elə indi başla.
          </p>
        </div>

        {/* Cards + connecting dashes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">

          {/* Desktop connector line */}
          <div
            className="hidden md:block absolute top-[52px] left-[calc(16.66%+24px)]
              right-[calc(16.66%+24px)] h-px border-t-2 border-dashed border-gray-200 z-0"
          />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative z-10 group bg-white border border-gray-100 rounded-3xl p-8
                hover:border-transparent hover:shadow-2xl hover:-translate-y-2
                transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6
                  group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: "#3B3BFF" }}
              >
                {step.icon}
              </div>

              {/* Step number */}
              <span
                className="text-xs font-black uppercase tracking-widest mb-3 block"
                style={{ color: "#3B3BFF" }}
              >
                Addım {step.number}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
