import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// [ВАЖНО] Middleware — ключевой механизм защиты роутов.
// Этот файл выполняется на каждом запросе ДО того, как запрос попадёт на страницу.
// Он проверяет наличие сессии Supabase и редиректит неавторизованных пользователей.

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // [ВАЖНО] Создаём серверный клиент внутри middleware для проверки сессии
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // [ВАЖНО] Читаем cookies из запроса
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        // [ВАЖНО] Устанавливаем cookies в ответе
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.set({ name, value, ...options });
        },
        // [ВАЖНО] Удаляем cookies
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // [ВАЖНО] Проверяем сессию пользователя
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // [ВАЖНО] Защищённые маршруты — доступны только авторизованным
  const protectedRoutes = ["/dashboard", "/subjects"];

  // Если пользователь не авторизован и пытается зайти на защищённый маршрут
  if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
    // [ВАЖНО] Редирект на страницу входа
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Если пользователь авторизован и пытается зайти на страницы логина/регистрации
  if (user && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))) {
    // [ВАЖНО] Редирект в личный кабинет
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// [ПОЛЕЗНО] Указываем, для каких путей срабатывает middleware
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};