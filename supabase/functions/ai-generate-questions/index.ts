// @ts-nocheck
// [ВАЖНО] AI Generate Questions — создаёт полный уникальный пробник ЕНТ
// Доступно 2 раза в сутки на пользователя

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
    const { userId, subjectPairId, subjectIds } = await req.json();

    if (!userId || !subjectPairId || !subjectIds) {
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

    // [ВАЖНО] Проверяем лимит: 2 генерации в сутки
    const today = new Date().toISOString().split("T")[0];
    const { data: usage } = await supabase
      .from("ai_generation_usage")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single();

    const currentCount = usage?.count || 0;
    const DAILY_LIMIT = 2;

    if (currentCount >= DAILY_LIMIT) {
      const nextAllowed = new Date();
      nextAllowed.setDate(nextAllowed.getDate() + 1);
      nextAllowed.setHours(0, 0, 0, 0);
      const hoursLeft = Math.ceil((nextAllowed.getTime() - Date.now()) / (1000 * 60 * 60));

      return new Response(
        JSON.stringify({
          error: `Лимит исчерпан (${DAILY_LIMIT} в сутки). Следующая генерация через ${hoursLeft} ч.`,
          limited: true,
          hoursLeft,
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Увеличиваем счётчик
    if (usage) {
      await supabase.from("ai_generation_usage").update({ count: currentCount + 1 }).eq("id", usage.id);
    } else {
      await supabase.from("ai_generation_usage").insert({ user_id: userId, date: today, count: 1 });
    }

    // [ВАЖНО] Получаем спецификации предметов
    const { data: pair } = await supabase.from("subject_pairs").select("*").eq("id", subjectPairId).single();

    // [ВАЖНО] Формируем промпт для генерации вопросов
    const systemPrompt = `Ты — эксперт по созданию тестовых заданий для ЕНТ (Казахстан).
Создай ${subjectIds.length * 40} уникальных тестовых заданий по следующим предметам: ${subjectIds.join(", ")}.

Требования:
- Формат: JSON массив объектов
- Каждый объект: { "subject_id": "...", "topic_id": "...", "difficulty": 1-3, "question_text": "...", "options": ["A", "B", "C", "D"], "correct_answer": 0-3, "explanation": "..." }
- difficulty: 1=базовый, 2=средний, 3=высокий
- 50% базовых, 30% средних, 20% высоких
- Для каждого предмета 40 вопросов
- Варианты ответов должны быть правдоподобными
- Объяснения краткие и понятные

Верни ТОЛЬКО JSON, без дополнительного текста.`;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Создай тест по предметам: ${subjectIds.join(", ")}` },
        ],
        max_tokens: 8192,
        temperature: 0.8,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", groqResponse.status, errorText);
      return new Response(JSON.stringify({ error: "Ошибка при генерации вопросов" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const groqData = await groqResponse.json();
    const content = groqData.choices?.[0]?.message?.content || "";

    // [ВАЖНО] Парсим JSON из ответа ИИ
    let questions;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("No JSON array found");
      questions = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("Parse error:", parseError, "Content:", content);
      return new Response(JSON.stringify({ error: "Не удалось распарсить ответ ИИ" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // [ВАЖНО] Сохраняем вопросы в БД
    const questionsToInsert = questions.map((q: any) => ({
      subject_id: q.subject_id,
      topic_id: q.topic_id || null,
      difficulty: q.difficulty || 1,
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation || null,
      created_by: "ai",
    }));

    const { data: insertedQuestions, error: insertError } = await supabase
      .from("questions")
      .insert(questionsToInsert)
      .select();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Ошибка при сохранении вопросов" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: insertedQuestions?.length || 0,
        message: `Создано ${insertedQuestions?.length || 0} вопросов!`,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Generate questions error:", error);
    return new Response(JSON.stringify({ error: "Внутренняя ошибка" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});