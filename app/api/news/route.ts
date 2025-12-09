import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  is_top: boolean;
  published_at: string;
}

// --- GET: top vest + ostale ili po slug ---
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      const news = await sql`SELECT * FROM news WHERE slug = ${slug} LIMIT 1` as NewsItem[];
      return NextResponse.json(news[0] ?? null);
    }

    const top = await sql`SELECT * FROM news WHERE is_top = TRUE LIMIT 1` as NewsItem[];
    const others = await sql`
      SELECT * FROM news
      WHERE is_top = FALSE
      ORDER BY published_at DESC
      LIMIT 50
    ` as NewsItem[];

    return NextResponse.json({
      top: top.length > 0 ? top[0] : null,
      others
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/news error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// --- POST: dodaje novu vest ---
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      title: string;
      excerpt: string;
      content: string;
      imageUrl: string;
      isTop?: boolean;
    };
    const { title, excerpt, content, imageUrl, isTop = false } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl je obavezan" }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");

    // Ako nova vest treba da bude top, resetuj prethodnu
    if (isTop) {
      await sql`UPDATE news SET is_top = FALSE WHERE is_top = TRUE`;
    }

    const result = await sql`
      INSERT INTO news (title, slug, excerpt, content, image_url, is_top)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${imageUrl}, ${isTop})
      RETURNING *;
    ` as NewsItem[];

    return NextResponse.json({ success: true, data: result[0] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("POST /api/news error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// --- DELETE: briše vest po ID ---
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID nije prosleđen" }, { status: 400 });

    await sql`DELETE FROM news WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("DELETE /api/news error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// --- PATCH: set_top vest ---
interface PatchBody {
  action: "set_top";
  id: string;
}

export async function PATCH(req: Request) {
  try {
    const body: PatchBody = await req.json();
    const { action, id } = body;

    if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });
    if (action !== "set_top") return NextResponse.json({ error: "Unknown action" }, { status: 400 });

    // resetuj prethodnu top vest
    await sql`UPDATE news SET is_top = FALSE WHERE is_top = TRUE`;
    // postavi novu top vest
    await sql`UPDATE news SET is_top = TRUE WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("PATCH /api/news error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
