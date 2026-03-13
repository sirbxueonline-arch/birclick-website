import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendWaitlistConfirmation, addToResendAudience } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // ── Rate limiting ────────────────────────────────────────────
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { allowed } = checkRateLimit(ip, 5, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Çox sayda sorğu. Bir dəqiqə gözləyin." },
        { status: 429 }
      );
    }

    // ── Validate ────────────────────────────────────────────────
    const body = await request.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Zəhmət olmasa etibarlı e-poçt ünvanı daxil edin." },
        { status: 400 }
      );
    }

    // ── Add to Resend audience + send confirmation (non-blocking) ─
    addToResendAudience(email).catch(() => {});
    sendWaitlistConfirmation(email).catch(() => {});

    return NextResponse.json(
      { message: "Gözləmə siyahısına uğurla əlavə edildiniz." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin." },
      { status: 500 }
    );
  }
}
