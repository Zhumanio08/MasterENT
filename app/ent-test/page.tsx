"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import type { Question, UserAnswer, SubjectPair } from "@/lib/types";

const SUBJECTS_ORDER = ["history_kz", "math_literacy", "reading_literacy", "profile1", "profile2"];

interface SubjectInfo {
  id: string;
  label: string;
  questionCount: number;
  maxScore: number;
  dbSubjectId: string; // для запроса вопросов из БД
}

// [ВАЖНО] Конфигурация предметов ЕНТ
function getSubjects(pair: SubjectPair): SubjectInfo[] {
  return [
    { id: "history_kz", label: "История Казахстана", questionCount: 20, maxScore: 20, dbSubjectId: "history_kz" },
    { id: "math_literacy", label: "Математическая грамотность", questionCount: 10, maxScore: 10, dbSubjectId: "math_literacy" },
    { id: "reading_literacy", label: "Грамотность чтения", questionCount: 10, maxScore: 10, dbSubjectId: "reading_literacy" },
    { id: "profile1", label: getProfileLabel(pair, 1), questionCount: 40, maxScore: 50, dbSubjectId: pair.subject1_id },
    { id: "profile2", label: getProfileLabel(pair, 2), questionCount: 40, maxScore: 50, dbSubjectId: pair.subject2_id },
  ];
}

function getProfileLabel(pair: SubjectPair, num: 1 | 2): string {
  const names: Record<string, string> = {
    chemistry: "Химия", biology: "Биология", informatics: "Информатика",
    math: "Математика", physics: "Физика", geography: "География",
    world_history: "Всемирная история", english: "Английский язык", law: "Основы права"
  };
  return names[num === 1 ? pair.subject1_id : pair.subject2_id] || "Профильный предмет";
}

// [ВАЖНО] Страница комплексного пробника ЕНТ (5 предметов, 140 баллов)
export default function ENTTestPage() {
  const router = useRouter();
  const [pair, setPair] = useState<SubjectPair | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const [answers, setAnswers] = useState<Record<string, Record<string, number>>>({});
  const [currentSubject, setCurrentSubject] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(18000); // 5 часов = 18000 секунд
  const [result, setResult] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      // Загружаем профиль и связку предметов
      const { data: profile } = await supabase.from("users").select("subject_pair_id").eq("id", user.id).single();
      if (!profile?.subject_pair_id) {
        setError("Сначала выберите связку предметов в личном кабинете");
        setLoading(false);
        return;
      }

      const { data: pairData } = await supabase.from("subject_pairs").select("*").eq("id", profile.subject_pair_id).single();
      if (!pairData) { setError("Связка не найдена"); setLoading(false); return; }
      setPair(pairData as SubjectPair);

      // Загружаем вопросы для всех 5 предметов
      const subjects = getSubjects(pairData as SubjectPair);
      const allQuestions: Record<string, Question[]> = {};

      for (const subj of subjects) {
        const subjectIds = subj.dbSubjectId;
        // Пытаемся загрузить вопросы из БД
        const { data: dbQuestions } = await supabase
          .from("questions")
          .select("*")
          .eq("subject_id", subjectIds);

        if (dbQuestions && dbQuestions.length > 0) {
          const shuffled = [...dbQuestions].sort(() => Math.random() - 0.5);
          allQuestions[subj.id] = shuffled.slice(0, Math.min(subj.questionCount, shuffled.length)) as Question[];
        } else {
          // Если вопросов нет — создаём заглушки
          allQuestions[subj.id] = generatePlaceholderQuestions(subj, subjectIds);
        }
      }

      setQuestions(allQuestions);
      setLoading(false);
    };
    init();
  }, [router]);

  // Таймер
  useEffect(() => {
    if (!testStarted || testFinished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [testStarted, testFinished]);

  // [ВАЖНО] Подсчёт баллов по системе ЕНТ
  const calculateScore = useCallback((correct: number, total: number, maxScore: number): number => {
    if (total === 0) return 0;
    return Math.round((correct / total) * maxScore);
  }, []);

  // [ВАЖНО] Завершение теста
  const handleFinish = useCallback(async () => {
    if (submitting || !pair) return;
    setSubmitting(true);
    setTestFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const subjects = getSubjects(pair);
    const results: Record<string, { correct: number; total: number; score: number; ans: UserAnswer[] }> = {};

    for (const subj of subjects) {
      const qs = questions[subj.id] || [];
      const ans = answers[subj.id] || {};
      let correct = 0;
      const answerDetails: UserAnswer[] = qs.map((q) => {
        const isCorrect = ans[q.id] === q.correct_answer;
        if (isCorrect) correct++;
        return {
          question_id: q.id,
          selected_option: ans[q.id] ?? -1,
          is_correct: isCorrect,
          topic_id: q.topic_id,
        };
      });
      const score = calculateScore(correct, qs.length, subj.maxScore);
      results[subj.id] = { correct, total: qs.length, score, ans: answerDetails };
    }

    const totalScore = results.history_kz.score + results.math_literacy.score +
      results.reading_literacy.score + results.profile1.score + results.profile2.score;

    setResult({ ...results, totalScore, subjects });

    // Сохраняем в БД
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("ent_attempts").insert({
        user_id: user.id,
        subject_pair_id: pair.id,
        history_kz_score: results.history_kz.score,
        math_lit_score: results.math_literacy.score,
        reading_lit_score: results.reading_literacy.score,
        profile1_score: results.profile1.score,
        profile2_score: results.profile2.score,
        total_score: totalScore,
        history_kz_correct: results.history_kz.correct,
        math_lit_correct: results.math_literacy.correct,
        reading_lit_correct: results.reading_literacy.correct,
        profile1_correct: results.profile1.correct,
        profile2_correct: results.profile2.correct,
        history_kz_answers: results.history_kz.ans,
        math_lit_answers: results.math_literacy.ans,
        reading_lit_answers: results.reading_literacy.ans,
        profile1_answers: results.profile1.ans,
        profile2_answers: results.profile2.ans,
      });
    }
    setSubmitting(false);
  }, [questions, answers, pair, submitting, calculateScore]);

  const handleSelectAnswer = (subjectId: string, questionId: string, optionIdx: number) => {
    if (testFinished) return;
    setAnswers((prev) => ({
      ...prev,
      [subjectId]: { ...(prev[subjectId] || {}), [questionId]: optionIdx },
    }));
  };

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Если профильные предметы ещё не выбраны
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={() => router.push("/dashboard")} className="text-primary-600 font-medium">
          Перейти в личный кабинет
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!testStarted) {
    const subjects = pair ? getSubjects(pair) : [];
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🧪 Комплексный пробник ЕНТ</h1>
          <p className="text-gray-600 mb-8">Тест включает 5 предметов. Максимальный балл: <strong>140</strong></p>
          <div className="grid gap-4 mb-8 text-left max-w-md mx-auto">
            {subjects.map((s) => (
              <div key={s.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{s.label}</span>
                <span className="text-sm text-gray-500">{s.questionCount} вопросов · {s.maxScore} баллов</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-6">Время: 5 часов</p>
          <button onClick={() => setTestStarted(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors">
            Начать пробник
          </button>
        </div>
      </div>
    );
  }

  if (testFinished && result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center mb-8">
          <div className="text-6xl mb-4">{result.totalScore >= 100 ? "🎉" : result.totalScore >= 70 ? "👍" : "💪"}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Пробник завершён!</h1>
          <div className="text-6xl font-bold text-primary-600 mb-2">{result.totalScore} / 140</div>
          <p className="text-gray-500 mb-6">{result.totalScore >= 100 ? "Отличный результат!" : result.totalScore >= 70 ? "Хороший результат, есть куда расти!" : "Нужно больше практики!"}</p>

          {result.subjects.map((s: any) => {
            const r = result[s.id];
            return (
              <div key={s.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2 text-left">
                <span className="text-gray-700">{s.label}</span>
                <span className="text-sm font-medium">{r.score}/{s.maxScore} ({r.correct}/{r.total} прав.)</span>
              </div>
            );
          })}

          {submitting && <p className="text-gray-500 animate-pulse mt-4">Сохраняем результат...</p>}

          <div className="flex gap-4 justify-center mt-8">
            <button onClick={() => router.push("/ent-test")}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
              Пройти заново
            </button>
            <button onClick={() => router.push("/dashboard")}
              className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors">
              В личный кабинет
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Основной экран теста
  const subjects = pair ? getSubjects(pair) : [];
  const current = subjects[currentSubject];
  const currentQs = questions[current?.id] || [];
  const q = currentQs[currentQuestion];
  const subjectAnswers = answers[current?.id] || {};
  const answeredCount = Object.keys(subjectAnswers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Навигация по предметам */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {subjects.map((s, idx) => (
          <button key={s.id} onClick={() => { setCurrentSubject(idx); setCurrentQuestion(0); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              idx === currentSubject ? "bg-primary-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary-300"
            }`}>
            {s.label}
          </button>
        ))}
        <div className={`ml-auto text-sm font-mono font-bold self-center ${timeLeft < 600 ? "text-red-600" : "text-gray-600"}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Прогресс предмета */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">{current?.label} — Вопрос {currentQuestion + 1} из {currentQs.length}</div>
        <div className="text-sm text-gray-500">Отвечено: {answeredCount}/{currentQs.length}</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / currentQs.length) * 100}%` }} />
      </div>

      {q ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <p className="text-lg font-medium text-gray-900 mb-6">{q.question_text}</p>
          <div className="space-y-3">
            {q.options.map((option, optIdx) => {
              const isSelected = subjectAnswers[q.id] === optIdx;
              return (
                <button key={optIdx} onClick={() => handleSelectAnswer(current.id, q.id, optIdx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected ? "border-primary-500 bg-primary-50" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}>
                  <span className="text-gray-800">{option}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">Нет вопросов для этого предмета</p>
        </div>
      )}

      {/* Навигация */}
      <div className="flex justify-between items-center">
        <button onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))} disabled={currentQuestion === 0}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors">
          ← Назад
        </button>

        {currentQuestion < currentQs.length - 1 ? (
          <button onClick={() => setCurrentQuestion((p) => p + 1)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Далее →
          </button>
        ) : currentSubject < subjects.length - 1 ? (
          <button onClick={() => { setCurrentSubject((p) => p + 1); setCurrentQuestion(0); }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Следующий предмет →
          </button>
        ) : (
          <button onClick={handleFinish} disabled={submitting}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-semibold transition-colors">
            {submitting ? "Сохранение..." : "Завершить тест"}
          </button>
        )}
      </div>
    </div>
  );
}

// Заглушки, если в БД нет вопросов
function generatePlaceholderQuestions(subj: SubjectInfo, dbId: string): Question[] {
  const placeholders: Record<string, { q: string; opts: string[]; correct: number }[]> = {
    history_kz: [
      { q: "В каком году Казахстан обрёл независимость?", opts: ["1990", "1991", "1992", "1993"], correct: 1 },
      { q: "Кто был первым президентом Казахстана?", opts: ["Токаев", "Назарбаев", "Сагдиев", "Кунаев"], correct: 1 },
      { q: "Когда была принята Конституция РК?", opts: ["1993", "1995", "1997", "2000"], correct: 1 },
    ],
    math_literacy: [
      { q: "Если 2x + 5 = 15, чему равен x?", opts: ["5", "10", "7.5", "3"], correct: 0 },
      { q: "Сколько процентов от 200 составляет 50?", opts: ["20%", "25%", "30%", "40%"], correct: 1 },
    ],
    reading_literacy: [
      { q: "Определите основную мысль текста: 'Солнце — источник жизни на Земле'", opts: ["Солнце горячее", "Солнце даёт жизнь", "Солнце далеко", "Солнце круглое"], correct: 1 },
      { q: "Какой тип текста описывает события в хронологическом порядке?", opts: ["Описание", "Повествование", "Рассуждение", "Диалог"], correct: 1 },
    ],
    chemistry: [
      { q: "Какая формула воды?", opts: ["CO2", "H2O", "NaCl", "HCl"], correct: 1 },
      { q: "Какой газ выделяется при реакции металла с кислотой?", opts: ["Кислород", "Азот", "Водород", "Углекислый газ"], correct: 2 },
    ],
    biology: [
      { q: "Какой органоид называют 'энергетической станцией' клетки?", opts: ["Ядро", "Рибосома", "Митохондрия", "Лизосома"], correct: 2 },
    ],
    informatics: [
      { q: "Сколько бит в одном байте?", opts: ["4", "8", "16", "32"], correct: 1 },
    ],
    math: [
      { q: "Чему равен квадратный корень из 144?", opts: ["10", "11", "12", "14"], correct: 2 },
    ],
    physics: [
      { q: "В каких единицах измеряется сила?", opts: ["Килограммах", "Ньютонах", "Джоулях", "Ваттах"], correct: 1 },
    ],
    geography: [
      { q: "Какая самая длинная река в мире?", opts: ["Амазонка", "Нил", "Миссисипи", "Янцзы"], correct: 0 },
    ],
    world_history: [
      { q: "В каком году началась Вторая мировая война?", opts: ["1937", "1939", "1941", "1945"], correct: 1 },
    ],
    english: [
      { q: "Как переводится 'I am a student'?", opts: ["Я учитель", "Я студент", "Я работаю", "Я учусь"], correct: 1 },
    ],
    law: [
      { q: "Что является основным законом РК?", opts: ["УК", "Конституция", "ГК", "ТК"], correct: 1 },
    ],
  };

  const pool = placeholders[dbId] || placeholders.math_literacy;
  const generated: Question[] = [];
  for (let i = 0; i < Math.min(subj.questionCount, pool.length * 3); i++) {
    const t = pool[i % pool.length];
    generated.push({
      id: `placeholder-${dbId}-${i}`,
      subject_id: dbId,
      topic_id: null,
      difficulty: 1,
      question_text: t.q,
      options: t.opts,
      correct_answer: t.correct,
      explanation: "Добавьте вопросы через админ-панель",
    });
  }
  return generated;
}