import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { transporter } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
try {
const { name, email, note, date, time } = await req.json();


if (!name || !email || !date || !time) {
  return NextResponse.json(
    { success: false, error: "Missing fields" },
    { status: 400 }
  );
}

const [appointment] = await sql`
  INSERT INTO appointments (name, email, note, date, time)
  VALUES (${name}, ${email}, ${note}, ${date}, ${time})
  RETURNING id, name, email, note, date, time, confirmed;
`;

// const formattedDate = new Date(date);
// const dateStr = `${formattedDate.getDate().toString().padStart(2,"0")}/${(formattedDate.getMonth()+1).toString().padStart(2,"0")}/${formattedDate.getFullYear()}`;
// const timeStr = `${time.split(":")[0].padStart(2,"0")}:${time.split(":")[1].padStart(2,"0")}`;
const submitTime = new Date().toLocaleString("de-DE");

/* ---------------------- MAIL KUPCU ---------------------- */
await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: `${email}`,
  subject: "Bestätigung Ihrer Terminanfrage",
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


/* ---------------------- MAIL ADMINU ---------------------- */
const adminEmails = [process.env.ADMIN_EMAIL, process.env.ADMIN2_EMAIL].filter(Boolean) as string[];


await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: adminEmails,
  subject: "Neuer Termin eingegangen",
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


return NextResponse.json({ success: true, appointment });


} catch (err) {
console.error(err);
return NextResponse.json(
{ success: false, error: (err as Error).message },
{ status: 500 }
);
}
}
