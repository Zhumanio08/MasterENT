import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// [ВАЖНО] Серверный клиент Supabase для использования в Server Components,
// middleware и Server Actions. Использует cookies для управления сессией.
export function createServerSupabaseClient() {
  const cookieStore = cookies();

  // [ВАЖНО] createServerClient настраивает автоматическое чтение/запись cookies
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // [ВАЖНО] Чтение cookies из запроса
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // [ВАЖНО] Установка cookies (для set/remove сессии)
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Middleware может перехватить эту ошибку
          }
        },
        // [ВАЖНО] Удаление cookies (при выходе)
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Middleware может перехватить эту ошибку
          }
        },
      },
    }
  );
}