"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import type { UserProfile, SubjectPair, ENTAttempt } from "@/lib/types";
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
export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [subjectPairs, setSubjectPairs] = useState<SubjectPair[]>([]);
  const [selectedPairId, setSelectedPairId] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [entAttempts, setEntAttempts] = useState<ENTAttempt[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [latestAnalysis, setLatestAnalysis] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [generationMessage, setGenerationMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

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
      setSelectedPairId(data.subject_pair_id || "");
      setLoading(false);
    };

    loadProfile();
  }, [router]);

  // [ВАЖНО] Загрузка доступных связок предметов
  useEffect(() => {
    const loadPairs = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("subject_pairs").select("*").order("name");
      if (data) setSubjectPairs(data as SubjectPair[]);
    };
    loadPairs();
  }, []);

  // [ВАЖНО] Загрузка результатов ЕНТ
  useEffect(() => {
    const loadENT = async () => {
      if (!profile?.id) return;
      const supabase = createClient();
      const { data } = await supabase
        .from("ent_attempts")
        .select("*")
        .eq("user_id", profile.id)
        .order("completed_at", { ascending: true });
      if (data) {
        setEntAttempts(data as ENTAttempt[]);
        const lastWithAnalysis = data.filter((a) => a.ai_analysis);
        if (lastWithAnalysis.length > 0) {
          setLatestAnalysis(lastWithAnalysis[lastWithAnalysis.length - 1].ai_analysis || null);
        }
      }
    };
    loadENT();
  }, [profile?.id]);

  // [ВАЖНО] Загрузка лимита генерации вопросов
  useEffect(() => {
    const loadGenerationLimit = async () => {
      if (!profile?.id) return;
      const supabase = createClient();
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("ai_generation_usage")
        .select("count")
        .eq("user_id", profile.id)
        .eq("date", today)
        .single();
      setGenerationCount(data?.count || 0);
    };
    loadGenerationLimit();
  }, [profile?.id]);

  // [ВАЖНО] Анализ последнего пробника через ИИ
  const handleAnalyzeLatest = async () => {
    if (entAttempts.length === 0 || analyzing) return;
    setAnalyzing(true);
    setLatestAnalysis(null);

    try {
      const supabase = createClient();
      const latest = entAttempts[entAttempts.length - 1];
      const pair = subjectPairs.find((p) => p.id === latest.subject_pair_id);

      const { data, error: fnError } = await supabase.functions.invoke("ai-analyze", {
        body: {
          userId: profile?.id,
          attemptId: latest.id,
          scores: {
            history_kz: latest.history_kz_score,
            math_lit: latest.math_lit_score,
            reading_lit: latest.reading_lit_score,
            profile1: latest.profile1_score,
            profile2: latest.profile2_score,
          },
          totalScore: latest.total_score,
          subjectPairName: pair?.name,
        },
      });

      if (fnError) throw fnError;
      setLatestAnalysis(data?.analysis || "Не удалось получить анализ");
    } catch (err: any) {
      console.error("Analysis error:", err);
      setLatestAnalysis("Ошибка при анализе. Попробуйте позже.");
    } finally {
      setAnalyzing(false);
    }
  };

  // [ВАЖНО] Генерация вопросов через ИИ (2 раза в сутки)
  const handleGenerateQuestions = async () => {
    if (!profile?.subject_pair_id || generating || generationCount >= 2) return;
    setGenerating(true);
    setGenerationMessage(null);

    try {
      const supabase = createClient();
      const pair = subjectPairs.find((p) => p.id === profile.subject_pair_id);
      const subjectIds = [pair?.subject1_id, pair?.subject2_id, "history_kz", "math_literacy", "reading_literacy"].filter(Boolean) as string[];

      const { data, error: fnError } = await supabase.functions.invoke("ai-generate-questions", {
        body: {
          userId: profile.id,
          subjectPairId: profile.subject_pair_id,
          subjectIds,
        },
      });

      if (fnError) throw fnError;

      setGenerationMessage(data?.message || "Генерация завершена");
      setGenerationCount((prev) => prev + 1);
    } catch (err: any) {
      console.error("Generation error:", err);
      setGenerationMessage(err?.message || "Ошибка при генерации");
    } finally {
      setGenerating(false);
    }
  };

  // [ВАЖНО] Сохранение выбранной связки предметов
  const handleSavePair = async () => {
    if (!profile) return;
    setSaving(true);
    setSaveMessage(null);

    const supabase = createClient();

    const { error } = await supabase
      .from("users")
      .update({ subject_pair_id: selectedPairId || null })
      .eq("id", profile.id);

    if (error) {
      setSaveMessage("Ошибка при сохранении: " + error.message);
    } else {
      setSaveMessage("Сохранено!");
      setProfile((prev) => (prev ? { ...prev, subject_pair_id: selectedPairId } : prev));
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

  // [ПРОБЕЖАТЬСЯ] Данные для графика ЕНТ (последние 5 попыток)
  const entChartData = entAttempts
    .filter((a) => a.completed_at)
    .map((a) => ({
      date: a.completed_at,
      score: a.total_score,
      max: 140,
    }))
    .slice(-5);

  const currentPair = subjectPairs.find((p) => p.id === selectedPairId);

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

        {/* [ВАЖНО] Карточка: выбор связки предметов ЕНТ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Связка предметов ЕНТ
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Выберите два профильных предмета для комплексного пробника
          </p>
          <select
            value={selectedPairId}
            onChange={(e) => setSelectedPairId(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
          >
            <option value="">— Не выбрано —</option>
            {subjectPairs.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {currentPair && (
            <p className="text-xs text-gray-500 mt-2">
              Профильные предметы: {currentPair.subject1_id} + {currentPair.subject2_id}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={handleSavePair}
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

        {/* [ПРОБЕЖАТЬСЯ] Карточка: График результатов ЕНТ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Динамика результатов ЕНТ
          </h2>
          {entChartData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={entChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis
                    domain={[0, 140]}
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(v) => `${v} баллов`}
                  />
                  <Tooltip
                    labelFormatter={(label) => formatDate(label)}
                    formatter={(value: number) => [`${value} / 140`, "Баллы ЕНТ"]}
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
            <p className="text-gray-500 text-center py-12">
              Пока нет результатов комплексных пробников. Пройдите тест в разделе{" "}
              <button onClick={() => router.push("/ent-test")} className="text-primary-600 underline">
                Комплексный пробник ЕНТ
              </button>
            </p>
          )}
        </div>

        {/* [ВАЖНО] Карточка: ИИ-помощник */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🤖 ИИ-помощник
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Анализ результатов</h3>
              <p className="text-sm text-gray-600 mb-4">
                Получи персональные рекомендации по подготовке к ЕНТ на основе твоих результатов
              </p>
              {entAttempts.length > 0 && (
                <button
                  onClick={handleAnalyzeLatest}
                  disabled={analyzing}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {analyzing ? "Анализ..." : "Проанализировать последний пробник"}
                </button>
              )}
              {latestAnalysis && (
                <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{latestAnalysis}</p>
                </div>
              )}
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Генерация вопросов</h3>
              <p className="text-sm text-gray-600 mb-2">
                Создай уникальный пробник ЕНТ с помощью ИИ. Доступно 2 раза в сутки.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Лимит: {generationCount}/2 сегодня
              </p>
              <button
                onClick={handleGenerateQuestions}
                disabled={generating || generationCount >= 2}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {generating ? "Генерация..." : "Сгенерировать пробник"}
              </button>
              {generationMessage && (
                <p className={`text-sm mt-2 ${generationMessage.includes("✓") ? "text-green-600" : "text-red-600"}`}>
                  {generationMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* [ВАЖНО] Карточка: последние результаты ЕНТ */}
        {entAttempts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Последние пробники ЕНТ
            </h2>
            <div className="space-y-3">
              {entAttempts.slice(-3).reverse().map((attempt) => {
                const pair = subjectPairs.find((p) => p.id === attempt.subject_pair_id);
                const date = new Date(attempt.completed_at).toLocaleDateString("ru-RU");
                return (
                  <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{pair?.name || "Связка не указана"}</p>
                      <p className="text-sm text-gray-500">{date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">{attempt.total_score} / 140</p>
                      <p className="text-xs text-gray-500">
                        ИК: {attempt.history_kz_score} · МГ: {attempt.math_lit_score} · ГЧ: {attempt.reading_lit_score}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}