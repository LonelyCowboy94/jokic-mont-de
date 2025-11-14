import { NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `Jokic-Mont kontakt form: ${subject}`,
      html: `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;
              background: #f7f7f7; border-radius: 8px;
              font-family: Arial, Helvetica, sans-serif; color: #333;">

    <!-- HEADER LOGO -->
    <div style="text-align: center; margin-bottom: 20px;">
      <img 
        src="https://jdmw.de/wp-content/uploads/go-x/u/02ade21c-51a2-4946-8118-8ddeffd0e136/l254,t0,w1491,h712/image-960x458.png"
        alt="Jokic Mont Logo"
        style="width: 180px; height: auto; border-radius: 6px;"
      />
    </div>

    
    <div style="background: #ffffff; padding: 20px 24px;
                border-radius: 8px; border: 1px solid #e2e2e2;
                box-shadow: 0 2px 6px rgba(0,0,0,0.07);">

      <h2 style="margin-top: 0; color: #2a7f3b; font-size: 22px;">
        Neue Kontaktanfrage
      </h2>

      <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
        <strong>Name:</strong> ${name}
      </p>

      <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
        <strong>Email:</strong> ${email}
      </p>

      <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
        <strong>Nachricht:</strong><br/>
        ${message || "(Keine Nachricht)"}
      </p>
    </div>

    <p style="text-align: center; font-size: 13px; color: #777; margin-top: 22px;">
  © ${`${new Date().getDate().toString().padStart(2,'0')}.${(new Date().getMonth()+1).toString().padStart(2,'0')}.${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2,'0')}:${new Date().getMinutes().toString().padStart(2,'0')}:${new Date().getSeconds().toString().padStart(2,'0')}`} Jokic Mont – Alle Rechte vorbehalten.
</p>

  </div>
`
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
