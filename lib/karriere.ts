import { sql } from "./db/index";

export interface Position {
  id: string;
  title: string;
  description: string;
  created_at?: string;
}

export async function getPositions() {
  const rows = await sql`
    SELECT id, title, description, created_at
    FROM offene_stellen
    ORDER BY created_at DESC
  `;
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    created_at: r.created_at?.toISOString(),
  }));
}

export async function createPosition(title: string, description: string) {
  await sql`
    INSERT INTO offene_stellen (title, description)
    VALUES (${title}, ${description})
  `;
}

export async function deletePosition(id: string) {
  await sql`
    DELETE FROM offene_stellen WHERE id = ${id}
  `;
}
