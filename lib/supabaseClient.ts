import { createBrowserClient } from "@supabase/ssr";

// [ВАЖНО] Клиентский компонент Supabase для использования в браузере.
// Этот клиент используется в клиентских компонентах (use client).
// Он автоматически управляет cookies сессии через @supabase/ssr.
export function createClient() {
  // [ВАЖНО] Переменные окружения обязательны для работы Supabase
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}