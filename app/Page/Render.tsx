"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CampoTarefa from "@/app/components/InputAdd";
import { ReactNode, useState } from "react";
import Adicionar from "@/app/actions";
import { useRouter } from "next/navigation";
import { Info, LogOut, Moon, SquarePlus, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { createClient } from "@/utils/supabase/client";
import Clear from "../components/ClearButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TbSourceCode } from "react-icons/tb";
import {
  SiLucide,
  SiNextdotjs,
  SiShadcnui,
  SiTailwindcss,
} from "react-icons/si";
import { RiSupabaseFill } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";
import { FaDiscord, FaGithub } from "react-icons/fa";
const supabase = await createClient();
const {
  data: { user },
} = await supabase.auth.getUser();

export default function Home({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [input, setinput] = useState("");
  const [infoOpen, setOpen] = useState(false);
  const { setTheme } = useTheme();

  async function HandleSubmit() {
    if (input.trim() === "") {
      alert("Digite algo, não ocupe espaço na database atoa :(");
      return;
    }

    await Adicionar(input);
    setinput("");
    router.refresh();
  }

  async function logOut() {
    const confirmed = confirm(
      "Tem certeza que deseja encerrar sua sessão? Será necessário logar novamente",
    );
    if (confirmed) {
      const singout = await supabase.auth.signOut();
      singout;
      alert("Sessão Encerrada!");
      router.refresh();
    }
  }

  console.log(user?.user_metadata.iss);
  const name = user?.user_metadata.full_name;
  const picture = user?.user_metadata.avatar_url || user?.user_metadata.picture;

  function App() {
    if (user?.app_metadata.provider == "discord") {
      return "<h1>test</h1>";
    }
    if (user?.app_metadata.provider == "github") {
      return "oiii";
    }
  }

  return (
    <>
      <div className="flex flex-col h-[100dvh] overflow-hidden w-full">
        <div className="flex justify-end px-4 pt-4 pb-2 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-sm">
                {user?.user_metadata.iss === "https://api.github.com" ? (
                  <FaGithub />
                ) : (
                  <FaDiscord />
                )}
                <h1 className="font-bold">{name}</h1>
                <Image
                  src={picture as string}
                  width={25}
                  height={25}
                  alt="Picture of the author"
                  className="rounded-4xl"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
                className="cursor-pointer"
              >
                <Info />
                <span>Info</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Clear />
              <DropdownMenuItem onClick={logOut} className="cursor-pointer">
                <LogOut color="red" />
                <h1 className="text-red-500">Sair</h1>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-start gap-6 px-4 overflow-hidden min-h-0 box-border">
          <div className="text-center shrink-0">
            <h1 className="text-2xl mt-1">Lista de Tarefas</h1>
            <h2 className="text-xs text-center">Olá {name}! 👋 </h2>
          </div>

          <div className="flex gap-2 w-full max-w-80 shrink-0">
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

          <div className="w-full flex-1 overflow-y-auto pb-20 flex flex-col items-center min-h-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {children}
          </div>
        </div>
      </div>

      {/* Info Dialog */}
      <Dialog open={infoOpen} onOpenChange={setOpen}>
        <DialogContent
          className="rounded-sm"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>CRUD?! COM SQL E AUTENTICAÇÃO?!</DialogTitle>
            <DialogDescription>
              <p className="">Dessa vez é um crud! </p>
              <p className="mt-2">Meu maior projeto até aqui! :)</p>
              <h1 className="mt-1">
                Sistema de autenticação fornecido pelo supabase, eu não tenho
                acesso as suas senhas
              </h1>
              <h1 className="mt-1 mb-1 text-[10px]">
                *Toda a UI do projeto foi feita com Shadcn, Tailwind, React
                Icons e Lucide
              </h1>
              <a
                href="https://github.com/guistumpf/lista-sql"
                className="w-fit block"
                onClick={(e) => e.stopPropagation()}
              >
                <TbSourceCode
                  className="text-2xl mt-2 mb-2 cursor-pointer"
                  title="Código Fonte"
                />
              </a>
              <p className="mb-2 mt-2 font-bold">Tecnologias Utilizadas:</p>
              <div className="flex justify-center gap-3">
                <FaGithub
                  className="text-2xl"
                  title="Github / Github Desktop"
                />
                <SiNextdotjs className="text-2xl" title="Next.Js" />
                <RiSupabaseFill className="text-2xl" title="Supabase" />
                <SiShadcnui className="text-2xl" title="Shadcn/ui" />
                <IoLogoVercel className="text-2xl" title="Vercel" />
                <SiLucide className="text-2xl" title="Lucide Icons" />
                <SiTailwindcss className="text-2xl" title="Tailwind Css" />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
