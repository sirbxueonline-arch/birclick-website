"use client";

import { useState, useEffect } from "react";

/* ─── Mock service cards shown on the right side of the hero ─── */
const mockCards = [
  {
    emoji: "🔧",
    name: "Kamran Əliyev",
    service: "Santexnik",
    price: "₼25/saat",
    rating: "4.9",
    reviews: "47",
    statusLabel: "İndi mövcud",
    statusDot: "#22c55e",
    accentBg: "#eff6ff",
    animClass: "animate-float1",
    posClass: "top-0 left-0",
  },
  {
    emoji: "⚡",
    name: "Rauf Həsənov",
    service: "Elektrik ustası",
    price: "₼30/saat",
    rating: "4.8",
    reviews: "31",
    statusLabel: "Bu gün mövcud",
    statusDot: "#f59e0b",
    accentBg: "#fefce8",
    animClass: "animate-float2",
    posClass: "top-40 right-0",
  },
  {
    emoji: "🧹",
    name: "Aytən Quliyeva",
    service: "Ev təmizliyi",
    price: "₼18/saat",
    rating: "5.0",
    reviews: "82",
    statusLabel: "Sabah mövcud",
    statusDot: "#3B3BFF",
    accentBg: "#f0f0ff",
    animClass: "animate-float3",
    posClass: "bottom-4 left-10",
  },
];

/* Avatar colours for social proof */
const avatars = [
  { initial: "N", bg: "#3B3BFF" },
  { initial: "E", bg: "#8B5CF6" },
  { initial: "K", bg: "#06B6D4" },
  { initial: "S", bg: "#F59E0B" },
  { initial: "L", bg: "#10B981" },
];

/* ─── Desktop floating card ─────────────────────────────────── */
function MockCard({ card }: { card: (typeof mockCards)[0] }) {
  return (
    <div
      className={`absolute ${card.posClass} ${card.animClass}
        bg-white rounded-2xl p-4 w-64 border border-gray-100
        hover:scale-105 hover:rotate-0 transition-all duration-300 cursor-pointer`}
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: card.accentBg }}
        >
          {card.emoji}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-gray-900 text-sm truncate">{card.name}</p>
          <p className="text-gray-400 text-xs">{card.service}</p>
        </div>
      </div>

      {/* Rating + price */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-xs leading-none">★★★★★</span>
          <span className="text-gray-800 text-xs font-bold">{card.rating}</span>
          <span className="text-gray-400 text-xs">({card.reviews})</span>
        </div>
        <span className="text-gray-900 text-sm font-extrabold">{card.price}</span>
      </div>

      {/* Status + CTA */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: card.statusDot }}
          />
          <span className="text-xs font-medium text-gray-600">{card.statusLabel}</span>
        </div>
        <button
          className="text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#3B3BFF" }}
        >
          Sifariş et
        </button>
      </div>
    </div>
  );
}

/* ─── Mobile compact card (horizontal scroll) ───────────────── */
function MobileCard({ card }: { card: (typeof mockCards)[0] }) {
  return (
    <div
      className="flex-shrink-0 bg-white rounded-2xl p-4 w-56 border border-gray-100 snap-start"
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: card.accentBg }}
        >
          {card.emoji}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-gray-900 text-xs truncate">{card.name}</p>
          <p className="text-gray-400 text-xs">{card.service}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-gray-800 text-xs font-bold">{card.rating}</span>
          <span className="text-gray-400 text-xs">({card.reviews})</span>
        </div>
        <span className="text-gray-900 text-xs font-extrabold">{card.price}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: card.statusDot }}
          />
          <span className="text-xs text-gray-500">{card.statusLabel}</span>
        </div>
        <button
          className="text-white text-xs font-bold px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: "#3B3BFF" }}
        >
          Sifariş et
        </button>
      </div>
    </div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────────── */
export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  /* Fetch live waitlist count on mount */
  useEffect(() => {
    fetch("/api/waitlist-count")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setWaitlistCount(data.count);
        }
      })
      .catch(() => {
        /* silently ignore — fallback text shown */
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMessage("Zəhmət olmasa etibarlı e-poçt ünvanı daxil edin.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
        /* Bump local count optimistically */
        setWaitlistCount((prev) => (prev !== null ? prev + 1 : null));
      } else if (res.status === 409) {
        setStatus("duplicate");
        setErrorMessage(data.error);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Xəta baş verdi. Yenidən cəhd edin.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    }
  };

  /* Display string for social proof */
  const countLabel = "İlk qoşulanlardan biri olun";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16 pb-8 sm:pb-0">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(to right, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Left radial fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* ── Left: text + form ─────────────────────────────── */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-8"
              style={{
                backgroundColor: "rgba(59,59,255,0.06)",
                borderColor: "rgba(59,59,255,0.18)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#3B3BFF" }}
              />
              <span className="text-sm font-medium text-gray-600">
                Tezliklə Azərbaycanda istifadəyə veriləcək
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-7xl font-black tracking-tighter text-gray-900 leading-none mb-5 sm:mb-6">
              İşçiləri tap
              <br />
              <span style={{ color: "#3B3BFF" }}>bir kliklə.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-gray-500 font-light max-w-lg mb-7 sm:mb-10 leading-relaxed">
              Azərbaycanda insanların saatlıq və ya günlük iş üçün xidmət
              təklif etdiyi platforma.
            </p>

            {/* Form / Success */}
            {status === "success" ? (
              <div
                className="inline-flex items-center gap-3 rounded-2xl px-5 py-4 border mb-8"
                style={{
                  backgroundColor: "rgba(59,59,255,0.07)",
                  borderColor: "rgba(59,59,255,0.25)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#3B3BFF" }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold" style={{ color: "#3B3BFF" }}>
                  Siz siyahıdasınız. Başladığımızda sizə xəbər verəcəyik.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mb-8">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== "idle") setStatus("idle");
                    }}
                    placeholder="E-poçtunuzu daxil edin"
                    className={`w-full px-5 py-4 rounded-2xl border-2 text-gray-900 placeholder-gray-400
                      text-base focus:outline-none transition-all bg-white shadow-sm
                      ${status === "error" || status === "duplicate"
                        ? "border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                    onFocus={(e) => {
                      if (status === "idle") e.target.style.borderColor = "#3B3BFF";
                    }}
                    onBlur={(e) => {
                      if (status === "idle") e.target.style.borderColor = "#e5e7eb";
                    }}
                  />
                  {(status === "error" || status === "duplicate") && (
                    <p className="text-red-500 text-sm mt-2 pl-1">{errorMessage}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="text-white px-6 py-4 rounded-2xl font-bold text-base hover:opacity-90
                    hover:shadow-xl hover:scale-105 transition-all duration-200
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                    flex items-center justify-center gap-2 whitespace-nowrap min-w-[160px]"
                  style={{ backgroundColor: "#3B3BFF" }}
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Qoşulur...
                    </>
                  ) : (
                    "Siyahıya qoşul"
                  )}
                </button>
              </form>
            )}

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-5 sm:pt-6 border-t border-gray-100">
              <div className="flex -space-x-2.5">
                {avatars.map((a, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white text-white text-xs
                      font-bold flex items-center justify-center select-none"
                    style={{ backgroundColor: a.bg }}
                  >
                    {a.initial}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {countLabel}
                </p>
                <p className="text-xs text-gray-400">
                  Gözləmə siyahısına ilk qoşulun
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: floating mock cards (desktop only) ──────── */}
          <div className="relative h-[520px] hidden lg:block">
            {/* Blue glow blob behind cards */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-80 h-80 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "rgba(59,59,255,0.12)" }}
            />

            {mockCards.map((card) => (
              <MockCard key={card.name} card={card} />
            ))}

            {/* Decorative brand badge */}
            <div
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-2xl px-4 py-3
                text-white text-sm font-bold shadow-xl pointer-events-none"
              style={{
                backgroundColor: "#3B3BFF",
                boxShadow: "0 8px 30px rgba(59,59,255,0.4)",
              }}
            >
              <p className="text-2xl font-black">bir</p>
              <p className="text-xs font-normal opacity-80">kliklə tap</p>
            </div>
          </div>
        </div>

        {/* ── Mobile mock cards (horizontal scroll) ──────────────── */}
        <div className="mt-8 lg:hidden">
          <p className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#3B3BFF" }}>
            Nümunə işçilər
          </p>
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
            {mockCards.map((card) => (
              <MobileCard key={card.name} card={card} />
            ))}
            {/* "More" teaser card */}
            <div
              className="flex-shrink-0 w-36 rounded-2xl border-2 border-dashed flex flex-col
                items-center justify-center gap-2 snap-start"
              style={{ borderColor: "rgba(59,59,255,0.25)" }}
            >
              <span className="text-2xl">+</span>
              <p className="text-xs text-center font-semibold px-2 leading-tight"
                style={{ color: "#3B3BFF" }}>
                Daha çox xidmət
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
