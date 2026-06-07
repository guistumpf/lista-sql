"use server";
export const dynamic = "force-dynamic";
import { sql } from "drizzle-orm";
import { db } from "../db";
import RealList from "./MapLista";
import { createClient } from "@/utils/supabase/server";
export default async function Lista() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticaded");

  const rows = await db.execute(
    sql`SELECT texto, id FROM "Tarefas" WHERE user_id=${user.id} ORDER BY id`,
  );
  return <RealList rows={rows as unknown as { id: number; texto: string }[]} />;
}
