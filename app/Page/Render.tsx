"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CampoTarefa from "@/app/components/InputAdd";
import { ReactNode, useState } from "react";
import Adicionar from "@/app/actions";
import { useRouter } from "next/navigation";
import { BadgePlus, LogOut, Moon, Plus, SquarePlus, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { createClient } from "@/utils/supabase/client";
import { json } from "stream/consumers";
const supabase = await createClient()   
const { data: { user } } = await supabase.auth.getUser()

export default function Home({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [input, setinput] = useState("");
  const { setTheme } = useTheme();
  async function HandleSubmit() {
    if (input.trim() === "") {
      alert("Digite algo, não ocupe espaço na database atoa :(");
      return;
    }
    
    await Adicionar(input);
    setinput("");
    alert("Tarefa Adicionada! :)");
    router.refresh();
  }




async function  logOut() {
 const confirmed = confirm("Tem certeza que deseja encerrar sua sessão? Será necessário logar novamente")  
  if(confirmed){
    const singout = await supabase.auth.signOut()
    singout
    alert("Sessão Encerrada! ")
    router.refresh()
  }
    }
    
console.log(user?.user_metadata)
 const name = user?.user_metadata.full_name
 const picture = user?.user_metadata.picture
  return (
    <> 
    <DropdownMenu>
          <DropdownMenuTrigger asChild className="fixed top-4 right-4 z-50">
            <Button variant="outline"className="rounded-sm">
            <h1 className="font-bold">{name}</h1><Image
      src={picture as string}
      width={25}
      height={25}
      alt="Picture of the author" 
      className="rounded-4xl"
    />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded">
           <DropdownMenuItem>
              Dark
            </DropdownMenuItem>
             <DropdownMenuItem onClick={logOut} className="cursor-pointer">
              <LogOut color="red"/> <h1 className="text-red-500 ">Sair</h1>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      <div className="fixed bottom-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-sm">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen w-full gap-6">
        <div className="text-center">
        <h1 className="text-2xl mt-1">Lista de Tarefas</h1>
        <h2 className="text-xs text center">Olá {name}! 👋 </h2>
        </div>
        <div className="flex gap-2 w-full max-w-80">
          <CampoTarefa
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
          <Button onClick={HandleSubmit} className="rounded-sm">
            <SquarePlus />
            Add
          </Button>
        </div>
        {children}
      </div>   
       </>
  );
}
