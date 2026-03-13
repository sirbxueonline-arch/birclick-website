// Sends a waitlist confirmation email via Resend and adds contact to audience.
// Gracefully skips if RESEND_API_KEY is not configured.
// Setup: https://resend.com — free tier covers thousands of emails.

export async function addToResendAudience(email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });
  } catch (err) {
    console.error("[resend] Failed to add contact to audience:", err);
  }
}

export async function sendWaitlistConfirmation(email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "BirClick <noreply@birclick.az>",
      to: email,
      subject: "Siz BirClick gözləmə siyahısındasınız",
      html: `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>BirClick Gözləmə Siyahısı</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f5f7ff;margin:0;padding:40px 20px;}
.container{max-width:600px;margin:auto;background:white;border-radius:16px;padding:50px 40px;text-align:center;box-shadow:0 15px 40px rgba(0,0,0,0.08);}
.logo img{height:180px;margin-bottom:25px;}
h1{font-size:30px;margin-bottom:16px;color:#111827;}
p{color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 25px 0;}
.btn{display:inline-block;padding:14px 32px;background:#4f46e5;color:white;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;}
.footer{margin-top:40px;font-size:13px;color:#9ca3af;}
</style>
</head>
<body>
<div class="container">
  <div class="logo">
    <img src="https://birclick.az/_next/image?url=%2Flogo.png&w=1200&q=75&dpl=dpl_DAZAtrXXUUw2mbasyazReh3RHUSP" alt="BirClick" />
  </div>
  <h1>Siz BirClick gözləmə siyahısındasınız</h1>
  <p>Qoşulduğunuz üçün təşəkkür edirik. BirClick çox tezliklə istifadəyə veriləcək.<br/>Siz platforma açılan kimi xəbər alacaq ilk istifadəçilərdən biri olacaqsınız.</p>
  <a class="btn" href="https://birclick.az">BirClick saytına keç</a>
  <p style="margin-top:30px">Bizi Instagram-da izləyin: <a href="https://instagram.com/birclick.az" style="color:#4f46e5;text-decoration:none;font-weight:600">@birclick.az</a></p>
  <div class="footer">© 2026 BirClick</div>
</div>
</body>
</html>`,
    });
  } catch (err) {
    // Log but never throw — email failure must not break the signup flow
    console.error("[email] Failed to send confirmation:", err);
  }
}
