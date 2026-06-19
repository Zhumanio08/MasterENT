-- [ВАЖНО] Таблица связок предметов ЕНТ.
-- Пользователь выбирает связку, а не вводит предметы вручную.
CREATE TABLE IF NOT EXISTS public.subject_pairs (
  id TEXT PRIMARY KEY, -- 'info-mat', 'geo-mat', etc.
  name TEXT NOT NULL, -- отображаемое название
  subject1_id TEXT NOT NULL, -- первый профильный предмет
  subject2_id TEXT NOT NULL -- второй профильный предмет
);

ALTER TABLE public.subject_pairs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read subject_pairs" ON public.subject_pairs;
CREATE POLICY "Anyone can read subject_pairs"
  ON public.subject_pairs
  FOR SELECT
  USING (true);

-- [ВАЖНО] Все возможные связки ЕНТ
INSERT INTO public.subject_pairs (id, name, subject1_id, subject2_id) VALUES
  ('info-mat', 'Информатика + Математика', 'informatics', 'math'),
  ('geo-mat', 'География + Математика', 'geography', 'math'),
  ('bio-geo', 'Биология + География', 'biology', 'geography'),
  ('chem-bio', 'Химия + Биология', 'chemistry', 'biology'),
  ('world-eng', 'Всемирная история + Английский язык', 'world_history', 'english'),
  ('phys-mat', 'Физика + Математика', 'physics', 'math'),
  ('phys-chem', 'Физика + Химия', 'physics', 'chemistry'),
  ('world-law', 'Всемирная история + Основы права', 'world_history', 'law')
ON CONFLICT (id) DO NOTHING;

-- [ВАЖНО] Добавляем поле subject_pair_id в users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS subject_pair_id TEXT REFERENCES public.subject_pairs(id);

-- [ВАЖНО] Обновляем триггер
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, first_name, last_name, class_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'class_name', ''),
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- [ВАЖНО] Таблица результатов комплексных пробников ЕНТ (5 предметов)
CREATE TABLE IF NOT EXISTS public.ent_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subject_pair_id TEXT NOT NULL REFERENCES public.subject_pairs(id),
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  -- Баллы по каждому предмету (максимум: ик=20, мг=10, гч=10, проф1=50, проф2=50)
  history_kz_score INTEGER NOT NULL DEFAULT 0,
  math_lit_score INTEGER NOT NULL DEFAULT 0,
  reading_lit_score INTEGER NOT NULL DEFAULT 0,
  profile1_score INTEGER NOT NULL DEFAULT 0,
  profile2_score INTEGER NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL DEFAULT 0, -- сумма всех баллов (max 140)
  -- Количество правильных ответов по каждому предмету
  history_kz_correct INTEGER NOT NULL DEFAULT 0,
  math_lit_correct INTEGER NOT NULL DEFAULT 0,
  reading_lit_correct INTEGER NOT NULL DEFAULT 0,
  profile1_correct INTEGER NOT NULL DEFAULT 0,
  profile2_correct INTEGER NOT NULL DEFAULT 0,
  -- Детальные ответы в JSONB
  history_kz_answers JSONB DEFAULT '[]'::jsonb,
  math_lit_answers JSONB DEFAULT '[]'::jsonb,
  reading_lit_answers JSONB DEFAULT '[]'::jsonb,
  profile1_answers JSONB DEFAULT '[]'::jsonb,
  profile2_answers JSONB DEFAULT '[]'::jsonb
);

ALTER TABLE public.ent_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own ent_attempts" ON public.ent_attempts;
CREATE POLICY "Users can read own ent_attempts"
  ON public.ent_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own ent_attempts" ON public.ent_attempts;
CREATE POLICY "Users can insert own ent_attempts"
  ON public.ent_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS ent_attempts_user_idx ON public.ent_attempts(user_id);