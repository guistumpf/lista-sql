"use server"

import { sql } from "drizzle-orm";
import { db } from "./db";


export default async function Adicionar(tarefa: string) {
    const add = await db.execute(sql`INSERT INTO "Tarefas" (texto) VALUES (${tarefa})`)


}