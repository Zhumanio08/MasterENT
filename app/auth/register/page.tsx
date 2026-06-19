"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";

// [ВАЖНО] Страница регистрации — создаёт пользователя в auth.users
// и затем вставляет запись в таблицу users (через триггер или вручную)
export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    class_name: "",
    email: "",
    password: "",
    subject_pair_id: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [subjectPairs, setSubjectPairs] = useState<{ id: string; name: string }[]>([]);

  // [ПОЛЕЗНО] Обновление полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // [ВАЖНО] Загружаем связки предметов при монтировании
  useEffect(() => {
    const loadPairs = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("subject_pairs").select("id, name").order("name");
      if (data) setSubjectPairs(data);
    };
    loadPairs();
  }, []);

  // [ВАЖНО] Обработчик регистрации — вызывает signUp, затем создаёт запись в users
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    // [ВАЖНО] Шаг 1: Регистрация в Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            class_name: formData.class_name,
            subject_pair_id: formData.subject_pair_id || null, // [ВАЖНО] Сохраняем связку
          },
        },
      });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!authData.user) {
      setError("Ошибка при создании пользователя");
      setLoading(false);
      return;
    }

    // [ВАЖНО] Запись в таблице users создаётся автоматически через триггер on_auth_user_created
    // (см. supabase/migrations/00001_create_users_table.sql)
    // Ждём немного, чтобы триггер успел выполниться
    await new Promise((resolve) => setTimeout(resolve, 500));

    // [ВАЖНО] После регистрации редиректим в личный кабинет
    router.push("/dashboard");
    router.refresh();
  };

  // [ПРОБЕЖАТЬСЯ] Поля формы регистрации
  const fields = [
    {
      name: "first_name",
      label: "Имя",
      placeholder: "Ваше имя",
      type: "text",
    },
    {
      name: "last_name",
      label: "Фамилия",
      placeholder: "Ваша фамилия",
      type: "text",
    },
    {
      name: "class_name",
      label: "Класс",
      placeholder: "Например: 11А",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "your@email.com",
      type: "email",
    },
    {
      name: "password",
      label: "Пароль",
      placeholder: "Минимум 6 символов",
      type: "password",
    },
  ] as const;

  // [ВАЖНО] Поле выбора связки предметов (отдельно от текстовых полей)
  const pairField = {
    name: "subject_pair_id",
    label: "Связка предметов ЕНТ",
    placeholder: "Выберите связку",
    type: "select" as const,
    options: subjectPairs,
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      {/* [ПРОБЕЖАТЬСЯ] Карточка формы регистрации */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Регистрация в MasterENT
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* [ПРОБЕЖАТЬСЯ] Форма регистрации */}
        <form onSubmit={handleRegister} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                required
                minLength={field.name === "password" ? 6 : undefined}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* [ВАЖНО] Выбор связки предметов */}
          <div>
            <label
              htmlFor={pairField.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {pairField.label}
            </label>
            <select
              id={pairField.name}
              name={pairField.name}
              value={formData.subject_pair_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
            >
              <option value="">— Выберите связку —</option>
              {pairField.options.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white py-2.5 rounded-lg font-semibold transition-colors mt-2"
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Уже есть аккаунт?{" "}
          <Link
            href="/auth/login"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}