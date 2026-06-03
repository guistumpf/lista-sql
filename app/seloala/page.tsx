"use server"

import { sql } from "drizzle-orm";
import { db } from "../db";
import Lista from "../components/lista";

export default async function(){
const algo = await db.execute(sql`SELECT * FROM public."Tarefas"`)

return <Lista/>
 

}





















