"use client"
import { createClient } from '@/utils/supabase/client'

export default function Login() {
  const supabase = createClient()

  async function loginWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  return(

    <button onClick={loginWithDiscord}>Login with Discord</button>
  ) 
}