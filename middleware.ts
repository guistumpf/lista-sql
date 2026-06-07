import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  
  if (
    request.nextUrl.pathname.match(
      /\.(?:css|js|map|json|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/i
    )
  ) {
    return NextResponse.next();
  }

  // 2. Initialize the response variable
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
     cookies: {
  getAll() {
    return request.cookies.getAll()
  },
  setAll(cookiesToSet) {
    cookiesToSet.forEach(({ name, value, options }) => {
      request.cookies.set(name, value)
      supabaseResponse.cookies.set(name, value, {
        ...options,
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        sameSite: 'lax', 
      })
    })
  },
},
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 3. Protect routes
  if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    
    const redirectResponse = NextResponse.redirect(url)
    
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    })
    
    return redirectResponse
  }

  return supabaseResponse
}



export const config = {
  matcher: [
  '/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}