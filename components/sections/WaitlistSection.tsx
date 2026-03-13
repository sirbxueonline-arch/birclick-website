"use client";

import { useState } from "react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <section id="waitlist" className="relative py-32 overflow-hidden bg-black">

      {/* Animated blue glow orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full pointer-events-none animate-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(59,59,255,0.35) 0%, rgba(59,59,255,0.08) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2
          w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ backgroundColor: "#3B3BFF" }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2
          w-64 h-64 rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{ backgroundColor: "#8B5CF6" }}
      />

      {/* Subtle noise grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10 border"
          style={{
            backgroundColor: "rgba(59,59,255,0.2)",
            borderColor: "rgba(59,59,255,0.4)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#3B3BFF" }}
          />
          <span className="text-sm font-semibold" style={{ color: "#8080FF" }}>
            Məhdud erkən giriş
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight mb-6">
          BirClick başlayanda
          <br />
          <span
            style={{
              color: "#3B3BFF",
              textShadow: "0 0 60px rgba(59,59,255,0.6)",
            }}
          >
            ilk ol.
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto leading-relaxed">
          Azərbaycanda xidmət tapmaq və təklif etmək üçün daha yaxşı
          yol gözləyən insanlara qoşul.
        </p>

        {/* Form / Success */}
        {status === "success" ? (
          <div
            className="inline-flex items-center gap-3 rounded-2xl px-6 py-5 border"
            style={{
              backgroundColor: "rgba(59,59,255,0.15)",
              borderColor: "rgba(59,59,255,0.4)",
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#3B3BFF" }}
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-bold text-lg" style={{ color: "#8080FF" }}>
              Siz siyahıdasınız. Başladığımızda sizə xəbər verəcəyik.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="E-poçtunuzu daxil edin"
                className={`w-full px-5 py-4 rounded-2xl border-2 text-white
                  placeholder-white/30 bg-white/10 text-base focus:outline-none transition-all
                  ${status === "error" || status === "duplicate"
                    ? "border-red-500/50"
                    : "border-white/10 hover:border-white/20"
                  }`}
                onFocus={(e) => {
                  if (status === "idle") e.target.style.borderColor = "#3B3BFF";
                }}
                onBlur={(e) => {
                  if (status === "idle")
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
              {(status === "error" || status === "duplicate") && (
                <p className="text-red-400 text-sm mt-2 text-left pl-1">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="text-white font-bold px-7 py-4 rounded-2xl text-base
                hover:opacity-90 hover:scale-105 transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                flex items-center justify-center gap-2 whitespace-nowrap min-w-[190px]"
              style={{
                backgroundColor: "#3B3BFF",
                boxShadow: "0 0 40px rgba(59,59,255,0.5)",
              }}
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Qoşulur...
                </>
              ) : (
                "Gözləmə siyahısına qoşul"
              )}
            </button>
          </form>
        )}

        <p className="text-sm text-white/25 mt-6">
          Spam yoxdur. İstənilən vaxt ləğv edə bilərsiniz.
        </p>

        {/* Mini trust badges */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {["🔒 Məlumatlarınız qorunur", "✉️ Yalnız əhəmiyyətli e-poçtlar", "🚀 Tezliklə"].map(
            (item, i) => (
              <span key={i} className="text-xs text-white/30 font-medium">
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
