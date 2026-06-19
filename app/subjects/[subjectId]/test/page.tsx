"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import type { Question } from "@/lib/types";

// [ПРОБЕЖАТЬСЯ] Количество вопросов в тесте
const QUESTIONS_PER_TEST = 5;

// [ВАЖНО] Страница прохождения теста — загружает вопросы, принимает ответы,
// подсчитывает результат и сохраняет попытку в профиль пользователя
export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subjectId as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 минут = 300 секунд
  const [testFinished, setTestFinished] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    correct: number;
    total: number;
  } | null>(null);

  // [ВАЖНО] useRef для доступа к актуальным значениям из замыканий (таймер)
  const answersRef = useRef<Record<string, number>>({});
  const questionsRef = useRef<Question[]>([]);

  // Синхронизируем ref с state при каждом изменении
  useEffect(() => { answersRef.current = answers; }, [answers]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);

  // [ВАЖНО] Загружаем вопросы из БД
  useEffect(() => {
    const loadQuestions = async () => {
      const supabase = createClient();

      // [ВАЖНО] Получаем случайные вопросы для этого предмета
      const { data: allQuestions } = await supabase
        .from("questions")
        .select("id, subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation")
        .eq("subject_id", subjectId);

      if (!allQuestions || allQuestions.length === 0) {
        setLoading(false);
        return;
      }

      // [ПОЛЕЗНО] Выбираем случайные вопросы
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(QUESTIONS_PER_TEST, shuffled.length));

      setQuestions(selected as Question[]);
      questionsRef.current = selected as Question[];
      setLoading(false);
    };

    loadQuestions();
  }, [subjectId]);

  // [ВАЖНО] Таймер обратного отсчёта — использует refs для доступа к данным
  useEffect(() => {
    if (loading || testFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Время вышло — завершаем тест с текущими ответами
          setTimeout(() => finishTest(questionsRef.current, answersRef.current), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, testFinished]);

  // [ВАЖНО] Функция завершения теста (вызывается и по кнопке, и по таймеру)
  const finishTest = useCallback(async (
    currentQuestions: Question[],
    currentAnswers: Record<string, number>
  ) => {
    if (submitting) return;
    setSubmitting(true);
    setTestFinished(true);

    // [ВАЖНО] Подсчёт правильных ответов
    let correctCount = 0;
    currentQuestions.forEach((q) => {
      if (currentAnswers[q.id] === q.correct_answer) {
        correctCount++;
      }
    });

    const totalQuestions = currentQuestions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    setResult({
      score,
      correct: correctCount,
      total: totalQuestions,
    });

    // [ВАЖНО] Сохраняем результат в таблицу users (поле attempts)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Получаем текущий профиль
      const { data: profile } = await supabase
        .from("users")
        .select("attempts")
        .eq("id", user.id)
        .single();

      const currentAttempts = (profile?.attempts as any[]) || [];

      // Создаём новую попытку
      const newAttempt = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        subject_id: subjectId,
        score,
        total_questions: totalQuestions,
        correct_answers: correctCount,
        answers: currentQuestions.map((q) => ({
          question_id: q.id,
          selected_option: currentAnswers[q.id] ?? -1,
          is_correct: currentAnswers[q.id] === q.correct_answer,
          topic_id: q.topic_id,
        })),
      };

      // Сохраняем в БД
      await supabase
        .from("users")
        .update({
          attempts: [...currentAttempts, newAttempt],
        })
        .eq("id", user.id);
    }

    setSubmitting(false);
  }, [submitting, subjectId]);

  // [ПОЛЕЗНО] Форматирование таймера
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // [ПРОБЕЖАТЬСЯ] Выбор ответа
  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (testFinished) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  // [ПРОБЕЖАТЬСЯ] Переход к следующему вопросу
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // [ПРОБЕЖАТЬСЯ] Переход к предыдущему вопросу
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // [ВАЖНО] Обработчик кнопки "Завершить тест"
  const handleFinishClick = () => {
    finishTest(questions, answers);
  };

  // ========== РЕНДЕРИНГ ==========

  // [ПРОБЕЖАТЬСЯ] Состояние загрузки
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  // Если вопросов нет
  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 mb-4">
          В этом предмете пока нет вопросов.
        </p>
        <button
          onClick={() => router.push(`/subjects/${subjectId}`)}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Вернуться
        </button>
      </div>
    );
  }

  // [ПРОБЕЖАТЬСЯ] Экран результатов
  if (testFinished && result) {
    const currentQuestion = questions[currentIndex];

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* [ВАЖНО] Результаты теста */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center mb-8">
          <div className="text-6xl mb-4">
            {result.score >= 80 ? "🎉" : result.score >= 50 ? "👍" : "💪"}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Тест завершён!
          </h1>
          <div className="flex justify-center gap-8 my-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">
                {result.score}%
              </div>
              <div className="text-sm text-gray-500">Результат</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                {result.correct}
              </div>
              <div className="text-sm text-gray-500">Правильно</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500">
                {result.total - result.correct}
              </div>
              <div className="text-sm text-gray-500">Ошибки</div>
            </div>
          </div>

          {submitting && (
            <p className="text-gray-500 animate-pulse">
              Сохраняем результат...
            </p>
          )}

          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => router.push(`/subjects/${subjectId}/test`)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Пройти заново
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-white border-2 border-gray-300 hover:border-primary-400 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              В личный кабинет
            </button>
          </div>
        </div>

        {/* [ПРОБЕЖАТЬСЯ] Разбор ответов */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Разбор ответов
          </h2>

          {/* Навигация по вопросам */}
          <div className="flex flex-wrap gap-2 mb-6">
            {questions.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correct_answer;
              const isAnswered = userAnswer !== undefined;

              let bgColor = "bg-gray-200";
              if (isAnswered) {
                bgColor = isCorrect ? "bg-green-500" : "bg-red-500";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded-full text-sm font-medium text-white ${bgColor} ${
                    currentIndex === idx ? "ring-2 ring-primary-500 ring-offset-2" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Текущий вопрос с разбором */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 mb-1">
              Вопрос {currentIndex + 1} из {questions.length}
            </p>
            <p className="text-lg font-medium text-gray-900 mb-4">
              {currentQuestion.question_text}
            </p>

            <div className="space-y-2">
              {currentQuestion.options.map((option, optIdx) => {
                const userAnswer = answers[currentQuestion.id];
                const isCorrectOption = optIdx === currentQuestion.correct_answer;
                const isUserChoice = optIdx === userAnswer;

                let borderColor = "border-gray-200";
                let bgColor = "bg-white";

                if (isCorrectOption) {
                  borderColor = "border-green-500";
                  bgColor = "bg-green-50";
                } else if (isUserChoice && !isCorrectOption) {
                  borderColor = "border-red-500";
                  bgColor = "bg-red-50";
                }

                return (
                  <div
                    key={optIdx}
                    className={`p-3 rounded-lg border-2 ${borderColor} ${bgColor}`}
                  >
                    <span className="text-gray-800">{option}</span>
                    {isCorrectOption && (
                      <span className="ml-2 text-green-600 text-sm">✓</span>
                    )}
                    {isUserChoice && !isCorrectOption && (
                      <span className="ml-2 text-red-600 text-sm">✗</span>
                    )}
                  </div>
                );
              })}
            </div>

            {currentQuestion.explanation && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Объяснение:
                </p>
                <p className="text-sm text-blue-700">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Навигация */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Назад
              </button>
              {currentIndex < questions.length - 1 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Далее →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // [ПРОБЕЖАТЬСЯ] Основной экран — прохождение теста
  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* [ПРОБЕЖАТЬСЯ] Прогресс-бар и таймер */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          Вопрос {currentIndex + 1} из {questions.length}
        </div>
        <div
          className={`text-sm font-mono font-bold ${
            timeLeft < 60 ? "text-red-600" : "text-gray-600"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Прогресс */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* [ВАЖНО] Карточка вопроса */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-lg font-medium text-gray-900 mb-6">
          {currentQuestion.question_text}
        </p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = answers[currentQuestion.id] === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectAnswer(currentQuestion.id, optIdx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-gray-800">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* [ПРОБЕЖАТЬСЯ] Навигация */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Назад
        </button>

        <div className="text-sm text-gray-500">
          Отвечено: {answeredCount} из {questions.length}
        </div>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleFinishClick}
            disabled={submitting}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-semibold transition-colors"
          >
            {submitting ? "Сохранение..." : "Завершить тест"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Далее →
          </button>
        )}
      </div>
    </div>
  );
}