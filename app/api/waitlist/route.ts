import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendWaitlistConfirmation } from "@/lib/email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // ── Rate limiting ────────────────────────────────────────────
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { allowed } = checkRateLimit(ip, 5, 60_000); // 5 req / minute
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

    // ── Duplicate check ─────────────────────────────────────────
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "Bu e-poçt artıq gözləmə siyahısındadır!" },
        { status: 409 }
      );
    }

    // ── Insert ──────────────────────────────────────────────────
    const { error } = await supabase.from("waitlist").insert({ email });
    if (error) throw error;

    // ── Confirmation email (non-blocking) ───────────────────────
    // Requires RESEND_API_KEY in .env.local — skipped if not set
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
