-- [ВАЖНО] Таблица для лимитов AI (чаты и генерация вопросов)
CREATE TABLE IF NOT EXISTS public.ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date TEXT NOT NULL, -- '2024-01-15'
  count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own ai_usage" ON public.ai_usage;
CREATE POLICY "Users can read own ai_usage"
  ON public.ai_usage
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own ai_usage" ON public.ai_usage;
CREATE POLICY "Users can insert own ai_usage"
  ON public.ai_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own ai_usage" ON public.ai_usage;
CREATE POLICY "Users can update own ai_usage"
  ON public.ai_usage
  FOR UPDATE
  USING (auth.uid() = user_id);

-- [ВАЖНО] Таблица для лимитов генерации вопросов (2 в сутки)
CREATE TABLE IF NOT EXISTS public.ai_generation_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

ALTER TABLE public.ai_generation_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own ai_generation_usage" ON public.ai_generation_usage;
CREATE POLICY "Users can read own ai_generation_usage"
  ON public.ai_generation_usage
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own ai_generation_usage" ON public.ai_generation_usage;
CREATE POLICY "Users can insert own ai_generation_usage"
  ON public.ai_generation_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own ai_generation_usage" ON public.ai_generation_usage;
CREATE POLICY "Users can update own ai_generation_usage"
  ON public.ai_generation_usage
  FOR UPDATE
  USING (auth.uid() = user_id);

-- [ВАЖНО] История чатов с ИИ
CREATE TABLE IF NOT EXISTS public.ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user' или 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own ai_chat_history" ON public.ai_chat_history;
CREATE POLICY "Users can read own ai_chat_history"
  ON public.ai_chat_history
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own ai_chat_history" ON public.ai_chat_history;
CREATE POLICY "Users can insert own ai_chat_history"
  ON public.ai_chat_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS ai_chat_history_user_idx ON public.ai_chat_history(user_id, created_at);

-- [ВАЖНО] Добавляем поле для AI анализа в ent_attempts
ALTER TABLE public.ent_attempts ADD COLUMN IF NOT EXISTS ai_analysis TEXT;
ALTER TABLE public.ent_attempts ADD COLUMN IF NOT EXISTS ai_analyzed_at TIMESTAMPTZ;