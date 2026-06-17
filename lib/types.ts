// [ПОЛЕЗНО] Типизация для таблицы users из Supabase
// Это помогает TypeScript понимать структуру данных при запросах

export interface UserProfile {
  id: string; // uuid — совпадает с auth.users.id
  first_name: string;
  last_name: string;
  class_name: string;
  subjects: string | null; // например "Химия + Биология"
  ent_date: string | null; // например "январь 2027"
  attempts: Attempt[] | null; // массив попыток пробников
}

// [ПОЛЕЗНО] Тип для отдельной попытки пробного тестирования
export interface Attempt {
  date: string; // дата в формате ISO
  score: number; // балл от 0 до 100
}

// [ПРОБЕЖАТЬСЯ] Тип для предмета (используется на странице /subjects)
export interface Subject {
  id: string;
  name: string;
  icon: string; // emoji или SVG-код
  color: string; // цвет для фона карточки
}