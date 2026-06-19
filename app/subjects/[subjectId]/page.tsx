"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import type { Question, Topic } from "@/lib/types";

// [ПРОБЕЖАТЬСЯ] Названия предметов
const subjectNames: Record<string, { name: string; icon: string }> = {
  chemistry: { name: "Химия", icon: "🧪" },
  biology: { name: "Биология", icon: "🧬" },
  informatics: { name: "Информатика", icon: "💻" },
  math: { name: "Математика", icon: "📐" },
  physics: { name: "Физика", icon: "⚛️" },
  geography: { name: "География", icon: "🌍" },
  history_kz: { name: "История КЗ", icon: "📜" },
  world_history: { name: "Всемирная история", icon: "🌎" },
  law: { name: "Основы права", icon: "⚖️" },
  english: { name: "Английский язык", icon: "🇬🇧" },
};

// [ВАЖНО] Страница предмета — лента вопросов для точечной подготовки
export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subjectId as string;
  const subject = subjectNames[subjectId];

  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!subject) {
      router.push("/subjects");
      return;
    }

    const loadData = async () => {
      const supabase = createClient();

      // Загружаем темы
      const { data: topicsData } = await supabase
        .from("topics")
        .select("*")
        .eq("subject_id", subjectId)
        .order("order_num");

      if (topicsData) setTopics(topicsData);

      // Загружаем все вопросы предмета (для ленты)
      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("subject_id", subjectId)
        .order("difficulty", { ascending: true });

      if (questionsData) setQuestions(questionsData as Question[]);
      setLoading(false);
    };

    loadData();
  }, [subjectId, subject, router]);

  const toggleAnswer = (qId: string) => {
    setShowAnswer((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const selectOption = (qId: string, optIdx: number) => {
    setSelectedOption((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const filteredQuestions = selectedTopic
    ? questions.filter((q) => q.topic_id === selectedTopic)
    : questions;

  // Если предмет не найден
  if (!subject) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* [ПРОБЕЖАТЬСЯ] Заголовок */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/subjects"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Назад
        </Link>
        <span className="text-4xl">{subject.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {subject.name}
          </h1>
          <p className="text-gray-500">
            {questions.length > 0
              ? `${questions.length} вопросов для тренировки`
              : "Нет вопросов"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-64" />
          <div className="h-48 bg-gray-200 rounded" />
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-500">
            Раздел пока не наполнен вопросами. Загляните позже.
          </p>
          <Link
            href="/subjects"
            className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Вернуться к предметам
          </Link>
        </div>
      ) : (
        <>
          {/* [ПРОБЕЖАТЬСЯ] Фильтр по темам */}
          {topics.length > 0 && (
            <div className="mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedTopic(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedTopic === null
                      ? "bg-primary-600 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-primary-300"
                  }`}
                >
                  Все темы
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedTopic === topic.id
                        ? "bg-primary-600 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-primary-300"
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* [ВАЖНО] Лента вопросов */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const isAnswered = showAnswer[q.id];
              const isCorrect = selectedOption[q.id] === q.correct_answer;
              const isWrong = selectedOption[q.id] !== undefined && !isCorrect;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-sm font-medium text-gray-500">
                      #{idx + 1}
                    </span>
                    <p className="text-lg font-medium text-gray-900 flex-1">
                      {q.question_text}
                    </p>
                  </div>

                  {/* [ПРОБЕЖАТЬСЯ] Варианты ответов */}
                  <div className="space-y-2 ml-8">
                    {q.options.map((option, optIdx) => {
                      const isSelected = selectedOption[q.id] === optIdx;
                      const isCorrectOption = optIdx === q.correct_answer;

                      // [ВАЖНО] До проверки ответа все варианты нейтральные
                      let optionClass = "border-gray-200 bg-white";
                      if (isAnswered) {
                        if (isCorrectOption) {
                          optionClass = "border-green-500 bg-green-50";
                        } else if (isSelected && isWrong) {
                          optionClass = "border-red-500 bg-red-50";
                        } else if (isSelected && isCorrect) {
                          optionClass = "border-green-500 bg-green-50";
                        }
                      } else if (isSelected) {
                        // [ПОЛЕЗНО] Выбранный вариант подсвечиваем мягко до проверки
                        optionClass = "border-primary-400 bg-primary-50";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            if (!isAnswered) {
                              selectOption(q.id, optIdx);
                            }
                          }}
                          disabled={isAnswered}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionClass} ${!isAnswered ? "hover:border-gray-300" : ""}`}
                        >
                          <span className="text-gray-800">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* [ВАЖНО] Кнопка проверки и объяснение */}
                  <div className="ml-8 mt-4">
                    {!isAnswered ? (
                      <button
                        onClick={() => toggleAnswer(q.id)}
                        disabled={selectedOption[q.id] === undefined}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Проверить ответ
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              isCorrect ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isCorrect ? "✓ Правильно" : "✗ Неправильно"}
                          </span>
                          <button
                            onClick={() => toggleAnswer(q.id)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            Скрыть
                          </button>
                        </div>
                        {q.explanation && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900">
                              <strong>Объяснение:</strong> {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}