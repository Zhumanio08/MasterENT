-- [ВАЖНО] Создание таблицы users для хранения профилей пользователей.
-- Эта таблица связана с auth.users через поле id.
-- После регистрации в auth.users триггер автоматически создаёт запись здесь.

-- Создаём таблицу users (если ещё не создана)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  class_name TEXT NOT NULL DEFAULT '',
  subjects TEXT,
  ent_date TEXT,
  attempts JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- [ВАЖНО] Включаем Row Level Security (RLS) — каждый пользователь видит только свои данные
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- [ВАЖНО] Политика RLS с DROP IF EXISTS — чтобы можно было запускать миграцию повторно
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
CREATE POLICY "Users can insert own data"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete own data" ON public.users;
CREATE POLICY "Users can delete own data"
  ON public.users
  FOR DELETE
  USING (auth.uid() = id);

-- Индекс для быстрого поиска по id
CREATE INDEX IF NOT EXISTS users_id_idx ON public.users(id);
