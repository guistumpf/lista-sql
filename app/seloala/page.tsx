"use server"

import { sql } from "drizzle-orm";
import { db } from "../db";
import Lista from "../components/RenderLista";
import Taskitems from "../components/EditLista";

export default async function(){
const algo = await db.execute(sql`SELECT * FROM public."Tarefas"`)

return <h1>legal</h1>
 

}

