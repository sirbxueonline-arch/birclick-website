// Sends a waitlist confirmation email via Resend.
// Gracefully skips if RESEND_API_KEY is not configured.
// Setup: https://resend.com — free tier covers thousands of emails.

export async function sendWaitlistConfirmation(email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "BirClick <noreply@birclick.az>",
      to: email,
      subject: "🎉 Siz BirClick gözləmə siyahısındasınız!",
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
          max-width:560px;margin:0 auto;padding:48px 24px;background:#ffffff;">

          <!-- Logo -->
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:40px;">
            <div style="width:36px;height:36px;background:#3B3BFF;border-radius:10px;
              display:flex;align-items:center;justify-content:center;">
              <span style="color:#fff;font-weight:900;font-size:18px;">B</span>
            </div>
            <span style="font-size:20px;font-weight:900;color:#111;letter-spacing:-0.5px;">
              birclick
            </span>
          </div>

          <!-- Heading -->
          <h1 style="font-size:32px;font-weight:900;color:#111;margin:0 0 16px;
            letter-spacing:-1px;line-height:1.1;">
            Siz siyahıdasınız! 🎉
          </h1>

          <p style="font-size:16px;color:#555;line-height:1.7;margin:0 0 28px;">
            BirClick gözləmə siyahısına uğurla qoşuldunuz.
            Platformamız Azərbaycanda işə düşən kimi sizi
            <strong>ilk xəbərdar edəcəyik</strong>.
          </p>

          <!-- Info card -->
          <div style="background:#f5f5ff;border-radius:14px;padding:24px;
            margin-bottom:28px;border:1px solid #e0e0ff;">
            <p style="color:#3B3BFF;font-weight:700;font-size:14px;
              margin:0 0 10px;letter-spacing:0.05em;text-transform:uppercase;">
              BirClick nədir?
            </p>
            <p style="color:#444;font-size:14px;line-height:1.6;margin:0;">
              Azərbaycanda santexnik, elektrik, təmizlikçi, sürücü
              və digər işçiləri <strong>bir kliklə</strong> tapa biləcəyiniz
              xidmət platforması.
            </p>
          </div>

          <!-- Social -->
          <p style="font-size:14px;color:#888;margin:0 0 8px;">
            Bizi izləyin:
            <a href="https://instagram.com/birclick.aze"
              style="color:#3B3BFF;text-decoration:none;font-weight:600;">
              @birclick.aze
            </a>
          </p>

          <hr style="border:none;border-top:1px solid #eee;margin:32px 0 20px;" />

          <p style="font-size:12px;color:#bbb;margin:0;">
            © ${new Date().getFullYear()} BirClick · Azərbaycan üçün xidmət platforması
          </p>
        </div>
      `,
    });
  } catch (err) {
    // Log but never throw — email failure must not break the signup flow
    console.error("[email] Failed to send confirmation:", err);
  }
}
