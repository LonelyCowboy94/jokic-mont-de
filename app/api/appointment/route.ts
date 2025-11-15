import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Termin from "@/models/Termin";
import { transporter } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, lastname, email, phone, note, date, time } = await req.json();

    // ✅ Validacija obaveznih polja
    if (!name || !email || !date || !time) {
      return new Response(
        JSON.stringify({ error: "Name, email, date, and time are required" }),
        { status: 400 }
      );
    }

    // ✅ Parsiranje datuma "dd.mm.yyyy"
    const [day, month, year] = date.split(".");
    const dateObj = new Date(`${year}-${month}-${day}`);
    if (isNaN(dateObj.getTime())) {
      return new Response(JSON.stringify({ error: "Invalid date format" }), {
        status: 400,
      });
    }

    // ✅ Datum u prošlosti
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (dateObj < now) {
      return new Response(
        JSON.stringify({ error: "Date cannot be in the past" }),
        { status: 400 }
      );
    }

    // ✅ MongoDB konekcija i kreiranje termina
    await connectMongo();
    const appointment = await Termin.create({
      name,
      lastname,
      email,
      phone,
      note,
      date: dateObj,
      time,
    });

    try {

      // Mail to Client
      await transporter.sendMail({
  from: process.env.SMTP_USER,
  replyTo: process.env.ADMIN_EMAIL,
  to: email,
  subject: `Termin-Anfrage erhalten`,
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

    <h2 style="margin-top: 0; color: #2a7fdb; font-size: 22px;">
      Termin-Anfrage erhalten
    </h2>

    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
      Sehr geehrte/r <strong>${name}</strong>,
    </p>

    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
      Ihr Antrag für einen Termin wurde erfolgreich empfangen. 
      Sie erhalten in kürzester Zeit eine Bestätigung.
    </p>

    <p style="font-size: 15px; line-height: 1.6; margin: 0;">
      Mit freundlichen Grüßen,<br/>
      <strong>Jokić Mont</strong>
    </p>
  </div>

  <p style="text-align: center; font-size: 13px; color: #777; margin-top: 22px;">
    © ${new Date().getFullYear()} Jokic Mont – Alle Rechte vorbehalten.
  </p>
</div>
`
});


      // Mail to Admin
      const now = new Date();
const submitTime = `${now.getDate().toString().padStart(2,'0')}.${(now.getMonth()+1).toString().padStart(2,'0')}.${now.getFullYear()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
const adminEmails = [process.env.ADMIN_EMAIL, process.env.ADMIN2_EMAIL].filter(Boolean) as string[];

await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: adminEmails,
  subject: `Neuer Termin-Antrag eingegangen`,
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

    <h2 style="margin-top: 0; color: #2a7fdb; font-size: 22px;">
      Neuer Termin-Antrag eingegangen
    </h2>

    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
      <strong>Name:</strong> ${name}<br/>
      <strong>Email:</strong> ${email}
    </p>

    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
      <strong>Datum:</strong> ${date}<br/>
      <strong>Uhrzeit:</strong> ${time} Uhr
    </p>

    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
      <strong>Notiz:</strong> ${note || "(Keine Notiz)"}
    </p>

    <p style="font-size: 14px; line-height: 1.6; margin: 0 0 12px; color: #555;">
      Formular abgeschickt am: <strong>${submitTime}</strong>
    </p>

    <p style="font-size: 15px; line-height: 1.6; margin: 0;">
      Bitte prüfen Sie die Details und bestätigen Sie den Termin ggf.
    </p>
  </div>

  <p style="text-align: center; font-size: 13px; color: #777; margin-top: 22px;">
    © ${new Date().getFullYear()} Jokic Mont – Alle Rechte vorbehalten.
  </p>
</div>
`
});

    } catch (mailErr) {
      console.error("Mail sending failed:", mailErr);
    }

    return NextResponse.json({ success: true, appointment });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}
