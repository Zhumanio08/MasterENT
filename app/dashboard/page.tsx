"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import type { UserProfile, Attempt } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// [ВАЖНО] Личный кабинет — загружает профиль пользователя из таблицы users
// Отображает данные, график попыток и поле для редактирования предметов
export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    // [ВАЖНО] Загружаем профиль пользователя при монтировании
    const loadProfile = async () => {
      const supabase = createClient();

      // [ВАЖНО] Проверяем сессию
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      // [ВАЖНО] Загружаем данные из таблицы users по id пользователя
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        setLoading(false);
        return;
      }

      setProfile(data as UserProfile);
      setSubjects(data.subjects || "");
      setLoading(false);
    };

    loadProfile();
  }, [router]);

  // [ВАЖНО] Сохранение изменений поля "связка предметов"
  const handleSaveSubjects = async () => {
    if (!profile) return;
    setSaving(true);
    setSaveMessage(null);

    const supabase = createClient();

    // [ВАЖНО] Обновляем поле subjects в таблице users
    const { error } = await supabase
      .from("users")
      .update({ subjects })
      .eq("id", profile.id);

    if (error) {
      setSaveMessage("Ошибка при сохранении: " + error.message);
    } else {
      setSaveMessage("Сохранено!");
      setProfile((prev) => (prev ? { ...prev, subjects } : prev));
    }

    setSaving(false);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // [ПОЛЕЗНО] Форматирование даты для графика
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  // [ПРОБЕЖАТЬСЯ] Состояние загрузки
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  // [ПРОБЕЖАТЬСЯ] Если профиль не загрузился
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Не удалось загрузить данные профиля.</p>
      </div>
    );
  }

  // [ПОЛЕЗНО] Берём последние 5 попыток для графика (по убыванию даты)
  const lastAttempts: Attempt[] = (profile.attempts || [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-5);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* [ПРОБЕЖАТЬСЯ] Заголовок */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Личный кабинет
      </h1>

      {/* [ПРОБЕЖАТЬСЯ] Сетка карточек */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* [ПРОБЕЖАТЬСЯ] Карточка: Основная информация */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Основная информация
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Имя:</span>
              <p className="text-gray-900 font-medium">
                {profile.first_name} {profile.last_name}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Класс:</span>
              <p className="text-gray-900 font-medium">
                {profile.class_name}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Дата ЕНТ:</span>
              <p className="text-gray-900 font-medium">
                {profile.ent_date || "Не указана"}
              </p>
            </div>
          </div>
        </div>

        {/* [ВАЖНО] Карточка: связка предметов (редактируемое поле) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Связка предметов
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Укажите предметы, которые планируете сдавать (например: Химия +
            Биология)
          </p>
          <textarea
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none"
            placeholder="Химия + Биология"
          />
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={handleSaveSubjects}
              disabled={saving}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? "Сохранение..." : "Сохранить"}
            </button>
            {saveMessage && (
              <span
                className={`text-sm ${
                  saveMessage === "Сохранено!"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {saveMessage}
              </span>
            )}
          </div>
        </div>

        {/* [ПРОБЕЖАТЬСЯ] Карточка: График попыток */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Динамика пробников
          </h2>
          {lastAttempts.length > 0 ? (
            // [ПОЛЕЗНО] График с использованием Recharts
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lastAttempts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    labelFormatter={(label) => formatDate(label)}
                    formatter={(value: number) => [`${value}%`, "Результат"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: "#6366f1", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            // [ПРОБЕЖАТЬСЯ] Заглушка, если нет попыток
            <p className="text-gray-500 text-center py-12">
              Пока нет результатов пробников. Пройдите первый тест в разделе
              предметов.
            </p>
          )}
        </div>

        {/* [ПРОБЕЖАТЬСЯ] Карточка: ИИ-аналитика (заглушка) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🤖 ИИ-аналитика
          </h2>
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6">
            <p className="text-gray-600">
              Здесь будет анализ ваших ошибок. Пока что пройдите больше
              пробников.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-200">
                Скоро
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border border-gray-200">
                В разработке
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}