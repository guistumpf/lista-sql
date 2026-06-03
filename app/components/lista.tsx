"use server"

import { sql } from "drizzle-orm";
import { db } from "../db";
import Delete from "./delete";


export default async function Lista() {
    const rows = await db.execute(sql`SELECT texto, id FROM "Tarefas"`)

    return (
        <ul>
            {rows.map((row, index) => (
                <li key={row.id as number}>{row.texto as string} | <Delete id={row.id as number} /> </li>

            ))}

        </ul>
    )


}