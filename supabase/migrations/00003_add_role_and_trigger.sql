-- [ВАЖНО] Добавляет поле role в существующую таблицу users
-- и создаёт триггер для автоматического создания профиля при регистрации.
-- Выполнять ПОСЛЕ 00001_create_users_table.sql и 00002_create_questions_tables.sql

-- Добавляем колонку role, если её ещё нет
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'student';

-- [ПОЛЕЗНО] Функция-триггер: автоматически создаёт запись в users при регистрации
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

-- [ВАЖНО] Триггер: срабатывает после создания пользователя в auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();