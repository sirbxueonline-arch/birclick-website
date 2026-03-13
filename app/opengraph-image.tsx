import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BirClick — Azərbaycan üçün xidmət platforması";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(59,59,255,0.4) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "44px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "#3B3BFF",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: "34px", fontWeight: 900 }}>B</span>
          </div>
          <span style={{ fontSize: "52px", fontWeight: 900, color: "#ffffff", letterSpacing: "-2px" }}>
            birclick
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 900,
            color: "#3B3BFF",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-2px",
          }}
        >
          İşçiləri bir kliklə tap.
        </div>

        {/* Sub */}
        <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.45)", textAlign: "center" }}>
          Azərbaycan üçün xidmət platforması
        </div>

        {/* Instagram */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          @birclick.aze
        </div>
      </div>
    ),
    { ...size }
  );
}
