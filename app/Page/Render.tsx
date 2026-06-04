"use client";

import { Button } from "@/components/ui/button";
import CampoTarefa from "@/app/components/InputAdd";
import { ReactNode, useState } from "react";
import Adicionar from "@/app/actions";
import { useRouter } from "next/navigation";
import { BadgePlus, Moon, Plus, SquarePlus, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

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

  return (
    <>
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
        <h1>Todo List</h1>
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
