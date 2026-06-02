"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CampoTarefa from "./components/input";
import { useState } from "react";



export default function Home() {

const [tarefa, settarefas] = useState("")
  
  
  return (
    <div className="p-0" >

      <h1>Todo List</h1>
      <div className="flex items-center gap-2 max-w-sm">
        <CampoTarefa
          value={tarefa}
          onChange={(e) => { 
            settarefas(e.target.value)
          }}
        />
        <Button>Add</Button>
      </div>
    </div>
  );
}
