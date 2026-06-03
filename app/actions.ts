"use server"

import { sql } from "drizzle-orm";
import { db } from "./db";


export default async function Adicionar(tarefa: string) {
    const add = await db.execute(sql`INSERT INTO "Tarefas" (texto) VALUES (${tarefa})`)

}

export async function deletar(id: number){
    const deleta = await db.execute(sql`DELETE FROM "Tarefas" WHERE id=${id}`)
}