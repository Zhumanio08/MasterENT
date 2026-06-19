// @ts-nocheck
// [ВАЖНО] AI Analyze — анализирует результаты пробника ЕНТ и даёт персональные рекомендации

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// [ПОЛЕЗНО] Type declarations для Deno
// @ts-ignore - Deno глобальный объект, доступный только в Edge Functions
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

const SYSTEM_PROMPT = `Ты — эксперт по анализу результатов ЕНТ и подготовке к поступлению.
Твоя задача:
1. Проанализировать результаты пробника ЕНТ пользователя
2. Выявить слабые места (предметы и темы)
3. Дать конкретные рекомендации по подготовке
4. Мотивировать пользователя
5. Отвечать по-русски

Будь конструктивным, конкретным и поддерживающим.`;

serve(async (req) => {
  // [ВАЖНО] CORS заголовки
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { userId, attemptId, scores, totalScore, subjectPairName } = await req.json();

    if (!userId || !scores) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set");
      return new Response(JSON.stringify({ error: "GROQ_API_KEY не установлен" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error("Supabase credentials not set");
      return new Response(JSON.stringify({ error: "Supabase credentials не установлены" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // [ВАЖНО] Формируем промпт для анализа
    const userPrompt = `Проанализируй результаты пробника ЕНТ:

Связка предметов: ${subjectPairName || "Не указана"}
Общий балл: ${totalScore || 0} / 140

Результаты по предметам:
- История Казахстана: ${scores.history_kz || 0} / 20
- Математическая грамотность: ${scores.math_lit || 0} / 10
- Грамотность чтения: ${scores.reading_lit || 0} / 10
- Профильный предмет 1: ${scores.profile1 || 0} / 50
- Профильный предмет 2: ${scores.profile2 || 0} / 50

Дай анализ:
1. Общая оценка результата
2. Сильные стороны
3. Слабые места (что нужно подтянуть)
4. Конкретные рекомендации по подготовке на ближайшую неделю
5. Мотивация`;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", groqResponse.status, errorText);
      return new Response(JSON.stringify({ error: "Ошибка при анализе" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const groqData = await groqResponse.json();
    const analysis = groqData.choices?.[0]?.message?.content || "Не удалось провести анализ.";

    // [ВАЖНО] Сохраняем анализ в БД
    if (attemptId) {
      await supabase.from("ent_attempts").update({
        ai_analysis: analysis,
        ai_analyzed_at: new Date().toISOString(),
      }).eq("id", attemptId);
    }

    return new Response(JSON.stringify({ analysis }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI analyze error:", error);
    return new Response(JSON.stringify({ error: "Внутренняя ошибка" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});