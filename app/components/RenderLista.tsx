"use server";

import { sql } from "drizzle-orm";
import { db } from "../db";
import RealList from "./MapLista";

export default async function Lista() {
  const rows = await db.execute(
    sql`SELECT texto, id FROM "Tarefas" ORDER BY id`,
  );

  return <RealList rows={rows as unknown as { id: number; texto: string }[]} />;
}
