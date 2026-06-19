-- [ВАЖНО] Таблица topics — темы внутри предмета (например "Органическая химия")
CREATE TABLE IF NOT EXISTS public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT NOT NULL, -- соответствует id из списка предметов: "chemistry", "biology", etc.
  name TEXT NOT NULL,
  description TEXT,
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- [ВАЖНО] Таблица questions — банк вопросов для тестов
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT NOT NULL, -- какой предмет
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  difficulty INTEGER NOT NULL DEFAULT 1, -- 1=лёгкий, 2=средний, 3=сложный
  question_text TEXT NOT NULL, -- текст вопроса
  options JSONB NOT NULL, -- массив вариантов ответов: ["вариант А", "вариант Б", ...]
  correct_answer INTEGER NOT NULL, -- индекс правильного ответа в массиве options (0-based)
  explanation TEXT, -- пояснение правильного ответа
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS для topics
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

-- Все авторизованные могут читать темы
DROP POLICY IF EXISTS "Anyone can read topics" ON public.topics;
CREATE POLICY "Anyone can read topics"
  ON public.topics
  FOR SELECT
  USING (true);

-- Только админы могут изменять темы (admin — роль в users)
DROP POLICY IF EXISTS "Admins can insert topics" ON public.topics;
CREATE POLICY "Admins can insert topics"
  ON public.topics
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can update topics" ON public.topics;
CREATE POLICY "Admins can update topics"
  ON public.topics
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can delete topics" ON public.topics;
CREATE POLICY "Admins can delete topics"
  ON public.topics
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- RLS для questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Все авторизованные могут читать вопросы
DROP POLICY IF EXISTS "Anyone can read questions" ON public.questions;
CREATE POLICY "Anyone can read questions"
  ON public.questions
  FOR SELECT
  USING (true);

-- Только админы могут изменять вопросы
DROP POLICY IF EXISTS "Admins can insert questions" ON public.questions;
CREATE POLICY "Admins can insert questions"
  ON public.questions
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can update questions" ON public.questions;
CREATE POLICY "Admins can update questions"
  ON public.questions
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can delete questions" ON public.questions;
CREATE POLICY "Admins can delete questions"
  ON public.questions
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Индексы для быстрых запросов
CREATE INDEX IF NOT EXISTS questions_subject_idx ON public.questions(subject_id);
CREATE INDEX IF NOT EXISTS questions_topic_idx ON public.questions(topic_id);
CREATE INDEX IF NOT EXISTS topics_subject_idx ON public.topics(subject_id);