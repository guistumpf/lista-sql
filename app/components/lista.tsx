"use server"

import { sql } from "drizzle-orm";
import { db } from "../db";

export default async function Lista(){
const rows = await db.execute(sql`SELECT (texto) FROM "Tarefas"`)

return (
    <ul>
        <ul>
      {rows.map((row, index) => (
        <li key={index}>{row.texto as string}</li>
      ))}
    </ul>
    </ul>
)


}