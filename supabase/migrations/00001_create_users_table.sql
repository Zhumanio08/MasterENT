-- [ВАЖНО] Создание таблицы users для хранения профилей пользователей.
-- Эта таблица связана с auth.users через поле id.
-- После регистрации в auth.users триггер автоматически создаёт запись здесь.

-- Создаём таблицу users
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

-- [ВАЖНО] Политика RLS: пользователь может читать только свою запись
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- [ВАЖНО] Политика RLS: пользователь может вставлять только свою запись
CREATE POLICY "Users can insert own data"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- [ВАЖНО] Политика RLS: пользователь может обновлять только свою запись
CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- [ВАЖНО] Политика RLS: пользователь может удалять только свою запись
CREATE POLICY "Users can delete own data"
  ON public.users
  FOR DELETE
  USING (auth.uid() = id);

-- [ПОЛЕЗНО] Функция-триггер: автоматически создаёт запись в users при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, first_name, last_name, class_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    ''
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- [ВАЖНО] Триггер: срабатывает после создания пользователя в auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Индекс для быстрого поиска по id
CREATE INDEX IF NOT EXISTS users_id_idx ON public.users(id);