"use client"
import Taskitems from "./EditLista";
import { useState } from "react";

export default function RealList({ rows }: { rows: { id: number, texto: string }[] }){
  
  const [editando, setedit] = useState<number | null>(null)
  

    return (
        <ul>
            {rows.map((row, index) => (
             <div key={index}><Taskitems editando={editando} setedit={setedit}tarefa={row.texto as string} id={row.id as number} key={index}/> </div> 
            ))}

        </ul>
    )
     

}