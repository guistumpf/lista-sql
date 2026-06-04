"use client";
import Taskitems from "./EditLista";
import { useState } from "react";

export default function RealList({
  rows,
}: {
  rows: { id: number; texto: string }[];
}) {
  const [editando, setedit] = useState<number | null>(null);

  return (
    <ul className="space-y-2">
      {rows.map((row, index) => (
        <div
          className="flex items-center gap-3 bg-card border border-border hover:bg-accent rounded-lg px-4 py-2.5 w-full transition-all duration-150"
          key={index}
        >
          <Taskitems
            editando={editando}
            setedit={setedit}
            tarefa={row.texto as string}
            id={row.id as number}
            key={index}
          />
        </div>
      ))}
    </ul>
  );
}
