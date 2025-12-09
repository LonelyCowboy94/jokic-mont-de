import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      const news = await sql`SELECT * FROM news WHERE slug = ${slug} LIMIT 1`;
      return NextResponse.json(news[0] ?? null);
    }

    const top = await sql`SELECT * FROM news WHERE is_top = TRUE LIMIT 1`;
    const others = await sql`
      SELECT * FROM news
      WHERE is_top = FALSE
      ORDER BY published_at DESC
      LIMIT 50
    `;

    return NextResponse.json({
      top: top.length > 0 ? top[0] : null,
      others: others
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/news error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
