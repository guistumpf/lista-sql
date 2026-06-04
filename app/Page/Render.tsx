"use client"

import { Button } from "@/components/ui/button";
import CampoTarefa from "@/app/components/InputAdd";
import { ReactNode, useState } from "react";
import Adicionar from "@/app/actions";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";


export default function Home({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [input, setinput] = useState("")

  async function HandleSubmit() {
    if (input.trim() === "") {
      alert("Digite algo, não ocupe espaço na database atoa :(")
      return
    }


    await Adicionar(input)
    setinput("")
    alert("Tarefa Adicionada! :)")
    router.refresh()
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full gap-6" >

      <h1>Todo List</h1>
      <div className="flex items-center gap-2 max-w-sm">
        <CampoTarefa
          value={input}
          onChange={(e) => {
            setinput(e.target.value)
          }}
  
        />
        <Button onClick={HandleSubmit}> 
    <Plus className="w-4 h-4 mr-1" />
        Add
     </Button>
      </div>
      {children}

    </div>
  );
}
