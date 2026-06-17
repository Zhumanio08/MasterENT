"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SubjectCard from "@/components/SubjectCard";
import type { Subject } from "@/lib/types";

// [ПРОБЕЖАТЬСЯ] Статический список предметов с иконками-эмодзи
const subjects: Subject[] = [
  { id: "chemistry", name: "Химия", icon: "🧪", color: "from-purple-400 to-pink-400" },
  { id: "biology", name: "Биология", icon: "🧬", color: "from-green-400 to-emerald-400" },
  { id: "informatics", name: "Информатика", icon: "💻", color: "from-blue-400 to-cyan-400" },
  { id: "math", name: "Математика", icon: "📐", color: "from-indigo-400 to-purple-400" },
  { id: "physics", name: "Физика", icon: "⚛️", color: "from-orange-400 to-red-400" },
  { id: "geography", name: "География", icon: "🌍", color: "from-teal-400 to-green-400" },
  {
    id: "history_kz",
    name: "История КЗ",
    icon: "📜",
    color: "from-yellow-400 to-orange-400",
  },
  {
    id: "world_history",
    name: "Всемирная история",
    icon: "🌎",
    color: "from-sky-400 to-blue-400",
  },
  { id: "law", name: "Основы права", icon: "⚖️", color: "from-amber-400 to-yellow-400" },
  { id: "english", name: "Английский язык", icon: "🇬🇧", color: "from-rose-400 to-pink-400" },
];

// [ПРОБЕЖАТЬСЯ] Страница со списком всех предметов
export default function SubjectsPage() {
  const router = useRouter();
  // [ПРОБЕЖАТЬСЯ] Состояние для модального окна "в разработке"
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // [ПРОБЕЖАТЬСЯ] Обработчик клика по предмету
  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* [ПРОБЕЖАТЬСЯ] Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Предметы</h1>
        <p className="text-gray-500 mt-2">
          Выберите предмет для подготовки к ЕНТ
        </p>
      </div>

      {/* [ПРОБЕЖАТЬСЯ] Сетка карточек предметов */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onClick={handleSubjectClick}
          />
        ))}
      </div>

      {/* [ПРОБЕЖАТЬСЯ] Модальное окно "Раздел в разработке" */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="text-6xl mb-4">{selectedSubject.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedSubject.name}
            </h2>
            <p className="text-gray-500 mb-6">Раздел в разработке</p>
            <button
              onClick={() => setSelectedSubject(null)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      )}
    </div>
  );
}