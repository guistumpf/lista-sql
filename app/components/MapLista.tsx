"use client"
import Taskitems from "./EditLista";
import { useState } from "react";

export default function RealList({ rows }: { rows: { id: number, texto: string }[] }) {

    const [editando, setedit] = useState<number | null>(null)


    return (
        <ul className="space-y-2">
            {rows.map((row, index) => (
                <div className=" flex items-center justify-between bg-[#1A1B1E] border border-zinc-600 rounded-sm px-4 py-2 w-fit block blockhover:bg-zinc-800 transition" key={index}>
                    <Taskitems editando={editando} setedit={setedit} tarefa={row.texto as string} id={row.id as number} key={index} /> 
                    </div>
            ))}

        </ul>
    )


}