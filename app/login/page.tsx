"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { BookMarked, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FaUser, FaUserNinja, FaUserSecret } from "react-icons/fa";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function Login() {
  const supabase = createClient();
  const { setTheme } = useTheme();

  async function loginWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }
  async function loginWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { prompt: "consent" },
      },
    });
  }

  return (
    <>
      <div className="h-[100dvh] overflow-hidden flex flex-col">
        {/* topo */}
        <div className="p-4 flex justify-center flex-col shrink-0">
          <h1 className="text-xl font-semibold flex justify-center">
            Lista de Tarefas
          </h1>
          <h3 className="text-[10px] text-zinc-400 text-center">
            Teste todas as possibilidades!
          </h3>
          <h3 className="text-[8px] text-zinc-400 text-center">
            Talvez seja necessário logar 2 vezes
          </h3>
        </div>

        {/* centro */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-[#121212] p-6 rounded-xl border border-[#212122] shadow-md flex flex-col gap-4 w-full max-w-sm">
            <div>
              <h1 className="text-lg font-semibold text-center text-white">
                Faça Seu Login
              </h1>
              <h3 className="text-[8px] text-zinc-400 text-center">
                Talvez seja necessário logar 2 vezes
              </h3>
            </div>
            <h3 className="text-xs text-zinc-400 text-center">
              Se o seu email do GitHub e Discord forem o mesmo, suas tarefas
              serão sincronizadas.
            </h3>

            <Button
              onClick={loginWithDiscord}
              className="w-full bg-purple-950 text-white hover:bg-[#fafafa] hover:text-black rounded-sm"
            >
              Login com Discord <FaDiscord />
            </Button>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-zinc-700" />
              <span className="text-xs text-zinc-500">ou</span>
              <div className="flex-1 h-px bg-zinc-700" />
            </div>

            <Button
              onClick={loginWithGithub}
              className="w-full bg-black text-white hover:bg-[#fafafa] hover:text-black rounded-sm"
            >
              Login com Github <FaGithub />
            </Button>

            <div className="text-center">
              <Dialog>
                {/* Adicionado asChild para evitar <button> dentro de <button> */}
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-xs text-zinc-400 hover:text-white rounded-sm"
                  >
                    <FaUser /> Continuar sem login
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Entrar Anonimamente</DialogTitle>
                    {/* Adicionado asChild e alterado h1 para div para evitar erros no HTML */}
                    <DialogDescription asChild>
                      <div className="flex flex-col">
                        <div className="font-bold text-m">
                          Quer explorar a lista sem login? Essa alternativa
                          existe!
                        </div>
                        <div className="mt-1">
                          Pórem vale ressaltar que suas tarefas não serão
                          sincronizadas.
                          <div className="mt-1">
                            É uma aplicação com visual identico ao da lista com
                            login, porém com usestorage, ou seja, ficará salvo
                            somente no seu navegador.
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button
                            asChild
                            className="rounded-sm hover:bg-[#26282A] hover:text-white"
                          >
                            <a href="https://lista-sql-anonimo.vercel.app/">
                              <FaUserSecret /> Entre sem Login
                            </a>
                          </Button>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Segurança e Privacidade */}
      <div className="fixed bottom-4 right-4 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-700 text-white hover:bg-[#fafafa] hover:text-black">
              Segurança e Privacidade <BookMarked />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Segurança dos seus dados</DialogTitle>
              <DialogDescription className="text-l ">
                Olá! Esse projeto possui duas alternativas de login, o que pode
                causar preocupações com dados e senhas.
              </DialogDescription>

              <div className="text-xs text-muted-foreground flex flex-col gap-y-3">
                <div>
                  Porém vale ressaltar que a camada de login foi construída com
                  arquivos que o próprio supabase usa em seus guias, e o
                  processo de autenticação passa pelas mãos do próprio supabase
                  em comunição com o Discord/Github.
                </div>

                <div>
                  <div className="font-bold text-sm mt-1">
                    Sobre o processo de autenticação/conexão com a conta:{" "}
                  </div>
                  <div className="mt-1">
                    Esse processo é feito com a criação de uma Aplicação/Bot
                    Oauth, sob resposabilidade do provedor dessa aplicação. Após
                    seu login, somente informações básicas (email, nome de
                    usuário) ficam armazenadas no banco de dados do supabase,
                    sendo utilizados para o seu login respectivamente.
                  </div>
                </div>

                <div>
                  <div className="font-bold text-sm mt-1">Termos:</div>
                  <div>
                    Ao fazer login, você concorda com os termos e condições do{" "}
                    <a
                      href="https://discord.com/terms"
                      className="text-decoration-line: underline"
                    >
                      Discord
                    </a>{" "}
                    ou{" "}
                    <a
                      href="https://docs.github.com/en/site-policy/github-terms/github-terms-of-service"
                      className="text-decoration-line: underline"
                    >
                      Github
                    </a>
                    .
                  </div>
                  <div>
                    Você também concorda com o fato de seu email estar
                    armazenado em um banco de dados fornecido pelo supabase.
                  </div>
                </div>

                <div>
                  <div className="font-bold text-sm mt-1">Extras:</div>
                  <div>
                    Falando de uma maneira informal, sei que é um projeto
                    pequeno mas acho legal esclarecer isso.
                  </div>
                  <div className="mt-1">
                    Vale ressaltar que o banco será apagado conforme
                    necessidade, pois existe um limite de dois projetos no
                    supabase. Então seu email não ficará armazenado por mais que
                    3 meses no banco.
                  </div>
                  <div className="font-bold text-sm mt-1">Referencias: </div>
                  <div className="mt-1">
                    <a
                      href="https://supabase.com/docs/guides/auth"
                      className="text-decoration-line: underline"
                    >
                      Supabase Auth
                    </a>{" "}
                    |{" "}
                    <a
                      href="https://docs.discord.com/developers/topics/oauth2"
                      className="text-decoration-line: underline"
                    >
                      Discord OAuth2
                    </a>{" "}
                    |{" "}
                    <a
                      href="https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps"
                      className="text-decoration-line: underline"
                    >
                      Github Oauth
                    </a>
                    <div>
                      <a
                        href="https://github.com/guistumpf/lista-sql"
                        className="text-decoration-line: underline"
                      >
                        Código Fonte
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="fixed bottom-4 left-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-sm">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
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
