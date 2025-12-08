import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { transporter } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
try {
const { id } = await req.json();
if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });


const [appointment] = await sql`
  UPDATE appointments
  SET confirmed = true
  WHERE id = ${id}
  RETURNING id, name, email, note, date, time, confirmed;
`;

if (!appointment) return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 });

// Formatiranje datuma u DD/MM/YYYY
const dateObj = new Date(appointment.date);
const formattedDate = `${dateObj.getDate().toString().padStart(2,'0')}/${(dateObj.getMonth()+1).toString().padStart(2,'0')}/${dateObj.getFullYear()}`;

// Formatiranje vremena u HH:MM
const [hourStr, minStr] = appointment.time.split(":");
const formattedTime = `${hourStr.padStart(2, "0")}:${minStr.padStart(2, "0")}`;

await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: appointment.email,
  subject: `Ihr Termin wurde bestätigt`,
  html: `


<div style="max-width: 600px; margin: 0 auto; padding: 20px;
            background: #f7f7f7; border-radius: 8px;
            font-family: Arial, Helvetica, sans-serif; color: #333;">

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
  Termin bestätigt
</h2>

<p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
  Sehr geehrte/r ${appointment.name},
</p>

<p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
  Ihr Termin wurde erfolgreich bestätigt.
  <br/><strong>Datum:</strong> ${formattedDate}<br/>
  <strong>Uhrzeit:</strong> ${formattedTime}<br/>
  ${appointment.note ? `<strong>Notiz:</strong> ${appointment.note}` : ""}
</p>

<p style="font-size: 15px; line-height: 1.6; margin: 0;">
  Wir freuen uns auf Ihren Besuch und stehen für Rückfragen jederzeit zur Verfügung.
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


return NextResponse.json({ success: true, appointment });


} catch (err) {
console.error(err);
return NextResponse.json({ success: false, error: (err as Error).message });
}
}
