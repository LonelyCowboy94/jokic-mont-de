import { getPositions, createPosition, deletePosition } from "@/lib/karriere";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await getPositions();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();
  if (!title || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await createPosition(title, description);
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await deletePosition(id);
  return NextResponse.json({ success: true });
}
