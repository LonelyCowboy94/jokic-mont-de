
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  const rows = await sql`SELECT * FROM offene_stellen ORDER BY created_at DESC`;
  return Response.json(rows);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();

  if (!title || !description) {
    return new Response("Missing fields", { status: 400 });
  }

  await sql`
    INSERT INTO offene_stellen (title, description)
    VALUES (${title}, ${description})
  `;

  return new Response("Created", { status: 201 });
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID nije prosleđen" }, { status: 400 });

    await sql`DELETE FROM offene_stellen WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("DELETE /api/karriere error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
