import { sql } from "./db/index";

export interface Position {
  id: string;
  title: string;
  description: string;
  created_at?: string;
}

export async function getPositions() {
  const rows = await sql`
    SELECT * FROM offene_stellen
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function createPosition(title: string, description: string) {
  await sql`
    INSERT INTO offene_stellen (title, description)
    VALUES (${title}, ${description})
  `;
}

export async function deletePosition(id: string) {
  await sql`DELETE FROM offene_stellen WHERE id = ${id}`;
}
