import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Termin from "@/models/Termin";
import { transporter } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("POST /appointment called");

    const body = await req.json();
    console.log("Received body:", body);

    const { name, lastname, email, phone, note, date, time } = body;

    // ✅ Validacija obaveznih polja
    if (!name || !email || !date || !time) {
      console.log("Validation failed");
      return new Response(
        JSON.stringify({ error: "Name, email, date, and time are required" }),
        { status: 400 }
      );
    }

    // ✅ Parsiranje datuma "dd.mm.yyyy"
    const [day, month, year] = date.split(".");
    const dateObj = new Date(`${year}-${month}-${day}`);
    if (isNaN(dateObj.getTime())) {
      console.log("Invalid date format:", date);
      return new Response(JSON.stringify({ error: "Invalid date format" }), {
        status: 400,
      });
    }

    // ✅ Datum u prošlosti
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (dateObj < now) {
      console.log("Date in the past:", dateObj);
      return new Response(
        JSON.stringify({ error: "Date cannot be in the past" }),
        { status: 400 }
      );
    }

    // ✅ MongoDB konekcija
    console.log("Connecting to MongoDB...");
    await connectMongo();
    console.log("MongoDB connected");

    // ✅ Kreiranje termina
    const appointment = await Termin.create({
      name,
      lastname,
      email,
      phone,
      note,
      date: dateObj,
      time,
    });
    console.log("Appointment created:", appointment);

    // ✅ Mail to Client
    console.log("Sending client mail to:", email);
    await transporter.sendMail({
      from: process.env.SMTP_USER!,
      replyTo: process.env.ADMIN_EMAIL!,
      to: email,
      subject: `Termin-Anfrage erhalten`,
      html: `<div>Hallo ${name}, Ihr Antrag wurde empfangen...</div>`, // možeš staviti tvoj full html
    });
    console.log("Client mail sent");

    // ✅ Mail to Admin
    const submitTime = `${now.getDate().toString().padStart(2,'0')}.${(now.getMonth()+1).toString().padStart(2,'0')}.${now.getFullYear()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
 
    console.log("Sending admin mail to:", process.env.ADMIN_EMAIL);

    await transporter.sendMail({
      from: process.env.SMTP_USER!,
      to: process.env.ADMIN_EMAIL,
      subject: `Neuer Termin-Antrag eingegangen`,
      html: `<div>Neuer Termin von ${name} um ${time}, Formular gesendet am ${submitTime}</div>`,
    });
    console.log("Admin mail sent");

    return NextResponse.json({ success: true, appointment });
  } catch (err) {
    console.error("Error in /appointment POST:", err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}
