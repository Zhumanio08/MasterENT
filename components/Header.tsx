"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

// [ВАЖНО] Header — шапка сайта, отображается на всех страницах.
// Использует клиентский компонент для проверки статуса авторизации.
export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // [ВАЖНО] При монтировании проверяем, есть ли активная сессия
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    // [ПОЛЕЗНО] Подписываемся на изменения статуса авторизации
    // Это обновляет Header в реальном времени при входе/выходе
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // [ВАЖНО] Функция выхода — вызывает signOut и редиректит на главную
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* [ПРОБЕЖАТЬСЯ] Контейнер шапки */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* [ПРОБЕЖАТЬСЯ] Логотип и название */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-600">
                MasterENT
              </span>
            </Link>
          </div>

          {/* [ПРОБЕЖАТЬСЯ] Навигация — зависит от статуса авторизации */}
          <nav className="flex items-center gap-4">
            {loading ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
            ) : user ? (
              <>
                {/* Авторизованный пользователь */}
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  Личный кабинет
                </Link>
                <Link
                  href="/subjects"
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  Предметы
                </Link>
                <Link
                  href="/ai-assistant"
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  🤖 ИИ-куратор
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                {/* Неавторизованный пользователь */}
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  Вход
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Регистрация
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}