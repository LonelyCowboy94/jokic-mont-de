"use server";

import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { Appointment, NewAppointment } from "@/types";

// FETCH users
export async function getData() {
  return await sql`SELECT id, name, email FROM users`;
}

// ADD USER
export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashed = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashed});
  `;
}

// CREATE APPOINTMENT
export async function createAppointment(data: NewAppointment) {
  const { name, email, date, time, confirmed = false } = data;

  await sql`
    INSERT INTO appointments (name, email, date, time, confirmed)
    VALUES (${name}, ${email}, ${date}, ${time}, ${confirmed});
  `;
}

// GET APPOINTMENTS
export async function getAppointments(): Promise<Appointment[]> {
  const rows = await sql`
    SELECT id, name, email, note, date, time, confirmed
    FROM appointments
    ORDER BY date DESC;
  `;
  return rows as Appointment[];
}

// LOGIN
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const [user] = await sql`
    SELECT id, email, password
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  if (!user) throw new Error("Ne postoji korisnik sa tim email-om.");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Pogrešan password.");

  (await cookies()).set("session", user.id.toString(), {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 dan
  });

  redirect("/admin");
}

// LOGOUT
export async function logoutAdmin() {
  (await cookies()).set("session", "", { maxAge: 0 });
  redirect("/login");
}
