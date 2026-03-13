"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const LAUNCH_DATE = new Date("2026-03-31T23:59:59+04:00");

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000)  / 60_000),
      seconds: Math.floor((diff % 60_000)     / 1_000),
      expired: diff === 0,
    };
  };
  const [time, setTime] = useState<ReturnType<typeof calc> | null>(null);
  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function WaitlistSection() {
  const { t } = useLanguage();
  const w = t.waitlist;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const countdown = useCountdown();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMessage(w.errorInvalid);
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
        setErrorMessage(data.error || w.errorGeneral);
      }
    } catch {
      setStatus("error");
      setErrorMessage(w.errorGeneral);
    }
  };

  return (
    <section id="waitlist" className="relative py-20 sm:py-32 overflow-hidden bg-black">

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

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight mb-5 sm:mb-6">
          {w.h2a}
          <br />
          <span style={{ color: "#3B3BFF", textShadow: "0 0 60px rgba(59,59,255,0.6)" }}>
            {w.h2b}
          </span>
        </h2>

        <p className="text-base sm:text-xl text-white/50 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
          {w.sub}
        </p>

        {/* ── Countdown timer ─────────────────────────────────── */}
        {countdown && !countdown.expired && (
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
              {w.countdownLabel}
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {[
                { value: countdown.days,    label: w.days },
                { value: countdown.hours,   label: w.hours },
                { value: countdown.minutes, label: w.mins },
                { value: countdown.seconds, label: w.secs },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border"
                    style={{
                      backgroundColor: "rgba(59,59,255,0.15)",
                      borderColor: "rgba(59,59,255,0.35)",
                    }}
                  >
                    <span className="text-xl sm:text-2xl font-black text-white tabular-nums leading-none">
                      {String(value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-white/40 font-semibold mt-0.5">{label}</span>
                  </div>
                  {i < 3 && (
                    <span className="text-white/30 font-black text-lg -mt-3 select-none">:</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
              {w.success}
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
                placeholder={w.placeholder}
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
                flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto sm:min-w-[190px]"
              style={{
                backgroundColor: "#3B3BFF",
                boxShadow: "0 0 40px rgba(59,59,255,0.5)",
              }}
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {w.joining}
                </>
              ) : (
                w.submit
              )}
            </button>
          </form>
        )}

        <p className="text-sm text-white/25 mt-6">{w.spam}</p>

        {/* Mini trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8 sm:mt-10">
          {w.trust.map(
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
