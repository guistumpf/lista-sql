"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { createClient } from '@/utils/supabase/client'
import { BookMarked } from 'lucide-react'
import { FaUser, FaUserNinja, FaUserSecret } from 'react-icons/fa'
import { FaDiscord, FaGithub } from 'react-icons/fa'

export default function Login() {
  const supabase = createClient()

  async function loginWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }
async function loginWithGithub() {
  await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback`,
    queryParams:{prompt: "consent"} 
  }
    })
}


  return(
    <>

    <div className="h-screen flex flex-col">
  
  {/* topo */}
  <div className="p-4 flex justify-center flex-col">
    <h1 className="text-xl font-semibold flex justify-center">Lista de Tarefas</h1>
  <h3 className="text-[10px] text-zinc-400 text-center">
    Projeto Fullstack Crud com Autenticação
    </h3>
  </div>

  {/* centro */}
  <div className="flex-1 flex items-center justify-center">
  <div className="bg-[#121212] p-6 rounded-xl border border-[#212122] shadow-md flex flex-col gap-4 w-full max-w-sm">

    <h1 className="text-lg font-semibold text-center">
      Faça Seu Login
    </h1>

    <h3 className="text-xs text-zinc-400 text-center  ">
      Se o seu email do GitHub e Discord forem o mesmo, suas tarefas serão sincronizadas.
    </h3>

    <Button
      onClick={loginWithDiscord}
      className="w-full bg-purple-950 text-white hover:bg-[#fafafa] hover:text-black rounded-sm"
    >
      Login com Discord <FaDiscord />
    </Button>
    
    <div className="flex items-center gap-2 ">
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
  <DialogTrigger>  
    <Button
    variant="ghost"
    className="text-xs text-zinc-400 hover:text-white rounded-sm "
  >
  <FaUser /> Continuar sem login
   </Button> 

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Entrar Anonimamente</DialogTitle>
      <DialogDescription>
        <h1 className='font-bold text-m'>Quer explorar a lista sem login? Essa alternativa existe!</h1>
        <h1 className='mt-1 '>Pórem vale ressaltar que suas tarefas não serão sincronizadas.
        <h1>
            É uma aplicação com visual identico ao da lista com login, porém com usestorage, ou seja, ficará salvo somente no seu navegador.
          </h1>
        </h1>
<div className='mt-3'>
          <Button className='rounded-sm hover:bg-[#26282A] hover:text-white' > <FaUserSecret/> Entre sem Login</Button>
</div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
  </div>
</div>

</div>
    
    {/* Dialog */}
    <div className='fixed bottom-4 right-4 z-50'>
       <Dialog>
  <DialogTrigger className=''><Button className='bg-blue-700 text-white hover:bg-[#fafafa] hover:text-black'>Segurança e Privacidade<BookMarked /></Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Segurança dos seus dados</DialogTitle>
      <DialogDescription>
       Olá! Esse projeto possui duas alternativas de login, o que pode causar preocupações com dados e senhas. 
      </DialogDescription>
      <DialogDescription>
<h1>
  Porém vale ressaltar que a camada de login foi construída com arquivos que o próprio supabase usa em seus guias, e o processo de autenticação
passa pelas mãos do próprio supabase em comunição com o Discord/Github.
  </h1>
      </DialogDescription>
    <DialogDescription>
<h1 className='font-bold text-sm mt-1'>Sobre o processo de autenticação/conexão com a conta: </h1>
<h1 className='mt-1'>Esse processo é feito com a criação de uma Aplicação/Bot Oauth, sob resposabilidade do provedor dessa aplicação. Após seu login, somente informações básicas (email, nome de usuário)
  ficam armazenadas no banco de dados do supabase, sendo utilizados para o seu login respectivamente.
</h1>
    </DialogDescription>
    <DialogDescription>
<h1 className='font-bold text-sm mt-1'>Termos:</h1>
  <h1>Ao fazer login, você concorda com os termos e condições do {<a href='https://discord.com/terms' className='	
text-decoration-line: underline'>Discord</a>} ou {<a href='https://docs.github.com/en/site-policy/github-terms/github-terms-of-service' className='text-decoration-line: underline'>Github</a>}.
</h1>
<h1>Você também concorda com o fato de seu email estar armazenado em um banco de dados fornecido pelo supabase.</h1>
    <h1 className='mt-1'>Minha responsabilidade como desenvolvedor é garantir que o arquivo .env esteja somente em minhas máquinas de desenvolvimento, não compartilhando com terceiros. Garantir a segurança das minhas credenciais também é meu dever.</h1>
    </DialogDescription>
    <DialogDescription>
<h1 className='font-bold text-sm mt-1'>Extras:</h1>
  <h1 className=''>Falando de uma maneira informal, sei que é um projeto pequeno mas acho legal esclarecer isso. 
</h1>
<h1 className='mt-1'>Vale ressaltar que o banco será apagado conforme necessidade, pois existe um limite de dois projetos no supabase. Então seu email não ficará armazenado por mais que 3 meses no banco.</h1>
    <h1 className='font-bold text-sm mt-1'>Referencias: </h1>
    <h1 className='mt-1'>
    {<a href='https://supabase.com/docs/guides/auth' className='text-decoration-line: underline'>Supabase Auth</a>} | 
    {<a href='https://docs.discord.com/developers/topics/oauth2' className='text-decoration-line: underline'>Discord OAuth2</a>} |  
     {<a href='https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps' className='text-decoration-line: underline'>Github Oauth</a>} 
    {<h1><a href='https://github.com/guistumpf/lista-sql' className='text-decoration-line: underline '>Código Fonte</a></h1>}
    
    
    </h1>
    </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>



    </>
  )
}