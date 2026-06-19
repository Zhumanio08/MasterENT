"use client";

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

  // [ВАЖНО] Обработчик клика по предмету — переход на страницу предмета
  const handleSubjectClick = (subject: Subject) => {
    router.push(`/subjects/${subject.id}`);
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
    </div>
  );
}