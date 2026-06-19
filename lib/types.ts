// [ПОЛЕЗНО] Типизация для таблицы users из Supabase
export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  class_name: string;
  role: "student" | "admin";
  subject_pair_id: string | null; // выбранная связка предметов
  subjects: string | null; // старое поле
  ent_date: string | null;
  attempts: Attempt[] | null;
}

// [ПОЛЕЗНО] Тип для отдельной попытки (старый формат)
export interface Attempt {
  id: string;
  date: string;
  subject_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  answers: UserAnswer[];
}

export interface UserAnswer {
  question_id: string;
  selected_option: number;
  is_correct: boolean;
  topic_id: string | null;
}

// [ВАЖНО] Связка предметов ЕНТ
export interface SubjectPair {
  id: string;
  name: string;
  subject1_id: string;
  subject2_id: string;
}

// [ВАЖНО] Результат комплексного пробника ЕНТ
export interface ENTAttempt {
  id: string;
  user_id: string;
  subject_pair_id: string;
  completed_at: string;
  history_kz_score: number;
  math_lit_score: number;
  reading_lit_score: number;
  profile1_score: number;
  profile2_score: number;
  total_score: number;
  history_kz_correct: number;
  math_lit_correct: number;
  reading_lit_correct: number;
  profile1_correct: number;
  profile2_correct: number;
  history_kz_answers: UserAnswer[];
  math_lit_answers: UserAnswer[];
  reading_lit_answers: UserAnswer[];
  profile1_answers: UserAnswer[];
  profile2_answers: UserAnswer[];
}

// [ПОЛЕЗНО] Вопрос из базы данных
export interface Question {
  id: string;
  subject_id: string;
  topic_id: string | null;
  difficulty: number;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
}

// [ПОЛЕЗНО] Тема внутри предмета
export interface Topic {
  id: string;
  subject_id: string;
  name: string;
  description: string | null;
  order_num: number;
}

// [ПРОБЕЖАТЬСЯ] Тип для предмета (на странице /subjects)
export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// [ПРОБЕЖАТЬСЯ] Конфигурация предметов ЕНТ
export const ENT_SUBJECTS_CONFIG: Record<string, { maxScore: number; questions: number; label: string }> = {
  history_kz: { maxScore: 20, questions: 20, label: "История Казахстана" },
  math_literacy: { maxScore: 10, questions: 10, label: "Математическая грамотность" },
  reading_literacy: { maxScore: 10, questions: 10, label: "Грамотность чтения" },
};

export const PROFILE_SUBJECTS_MAX = 50;
export const PROFILE_SUBJECTS_QUESTIONS = 40;