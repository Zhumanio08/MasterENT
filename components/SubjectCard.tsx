"use client";

import type { Subject } from "@/lib/types";

// [ПРОБЕЖАТЬСЯ] Карточка предмета — отображается на странице /subjects
// Принимает объект Subject и рендерит иконку с названием
interface SubjectCardProps {
  subject: Subject;
  onClick: (subject: Subject) => void;
}

export default function SubjectCard({ subject, onClick }: SubjectCardProps) {
  return (
    <button
      onClick={() => onClick(subject)}
      className="group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-200 bg-white hover:border-primary-400 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      {/* [ПРОБЕЖАТЬСЯ] Иконка предмета */}
      <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
        {subject.icon}
      </span>

      {/* [ПРОБЕЖАТЬСЯ] Название предмета */}
      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
        {subject.name}
      </span>
    </button>
  );
}