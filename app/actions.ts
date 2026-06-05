"use server"

import { sql } from "drizzle-orm";
import { db } from "./db";
import { createClient } from "@/utils/supabase/server";
  

export default async function Adicionar(tarefa: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const add = await db.execute(sql`INSERT INTO "Tarefas" (texto, user_id) VALUES (${tarefa}, ${user.id}) `)
}

export async function deletar(id: number){
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const deleta = await db.execute(sql`DELETE FROM "Tarefas" WHERE id=${id} AND user_id=${user.id}`)
}

export async function update(tarefa: string, id:number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const edit = await db.execute (sql`UPDATE "Tarefas" SET texto=${tarefa} WHERE id=${id} AND user_id=${user.id}`)
}

