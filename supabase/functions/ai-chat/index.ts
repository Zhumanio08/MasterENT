// @ts-nocheck
// [ВАЖНО] Этот файл выполняется в Deno (Edge Functions), а не в Node.js.
// TypeScript ошибки ниже — только для IDE, они не влияют на сборку Next.js
// (файл excluded в tsconfig.json: "exclude": ["supabase/functions"])

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// [ВАЖНО] AI Chat — личный куратор
// Использует Groq API для ответов на вопросы абитуриента

// [ПОЛЕЗНО] Type declarations для Deno (исправляет TS ошибки в редакторе)
// @ts-ignore - Deno глобальный объект, доступный только в Edge Functions
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY") || "";
// [ВАЖНО] Supabase автоматически предоставляет эти переменные в Edge Functions
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

// [ПОЛЕЗНО] Системный промпт для ИИ-куратора
const SYSTEM_PROMPT = `Ты — профессиональный куратор по подготовке к ЕНТ (единому национальному тестированию в Казахстане).
Твоя задача:
- Объяснять сложные темы простым языком
- Давать советы по подготовке к ЕНТ
- Помогать с решением задач по предметам: математика, физика, химия, биология, география, история Казахстана, всемирная история, основы права, английский язык, информатика, математическая грамотность, грамотность чтения
- Мотивировать и поддерживать абитуриента
- Отвечать по-русски или казахски, в зависимости от языка пользователя

Будь дружелюбным, понятным и структурированным.`;

serve(async (req: Request) => {
  // [ВАЖНО] CORS заголовки — без них браузер блокирует запросы из фронтенда
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
    const { message, userId, history } = await req.json();

    if (!message || !userId) {
      return new Response(JSON.stringify({ error: "Missing message or userId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // [ВАЖНО] Проверяем наличие API ключа Groq
    if (!GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set in Edge Function environment variables");
      return new Response(
        JSON.stringify({ 
          reply: "Ошибка конфигурации: GROQ_API_KEY не установлен. Установите переменные окружения в Supabase Dashboard → Settings → Edge Functions → Environment Variables.",
          error: "GROQ_API_KEY not set",
          setup_guide: "https://supabase.com/docs/guides/functions/env-vars"
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error("Supabase credentials are not set. URL:", SUPABASE_URL, "Key length:", SUPABASE_ANON_KEY.length);
      return new Response(
        JSON.stringify({ 
          reply: "Ошибка конфигурации: учетные данные Supabase не установлены. Supabase должен предоставлять SUPABASE_URL и SUPABASE_ANON_KEY автоматически.",
          error: "Supabase credentials not set",
          url_status: SUPABASE_URL ? "set" : "missing",
          key_status: SUPABASE_ANON_KEY ? "set" : "missing"
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // [ВАЖНО] Проверяем лимит: 50 сообщений в день на пользователя
    console.log("Creating Supabase client with URL:", SUPABASE_URL);
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const today = new Date().toISOString().split("T")[0];

    const { data: usage, error: usageError } = await supabase
      .from("ai_usage")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single();
    
    if (usageError && usageError.code !== "PGRST116") {
      console.error("Usage check error:", usageError);
    }

    if (usageError && usageError.code !== "PGRST116") {
      console.error("Usage check error:", usageError);
      // [ПОЛЕЗНО] PGRST116 = "no rows found" — это нормально при первой записи
    }

    const currentCount = usage?.count || 0;
    const DAILY_LIMIT = 50;

    if (currentCount >= DAILY_LIMIT) {
      return new Response(
        JSON.stringify({
          reply: "Достигнут дневной лимит сообщений (50). Попробуйте завтра! 💪",
          limited: true,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Увеличиваем счётчик
    if (usage) {
      await supabase.from("ai_usage").update({ count: currentCount + 1 }).eq("id", usage.id);
    } else {
      await supabase.from("ai_usage").insert({ user_id: userId, date: today, count: 1 });
    }

    // [ВАЖНО] Формируем сообщения для Groq
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // [ВАЖНО] Вызываем Groq API
    console.log("Calling Groq API...");
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", groqResponse.status, errorText);
      return new Response(
        JSON.stringify({ 
          reply: "Ошибка при обращении к ИИ. Попробуйте позже.", 
          error: `Groq API returned ${groqResponse.status}: ${errorText}` 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const groqData = await groqResponse.json();
    const reply = groqData.choices?.[0]?.message?.content || "Не удалось получить ответ.";
    console.log("Got reply from Groq, length:", reply.length);

    // Сохраняем в историю
    console.log("Saving to history...");
    await supabase.from("ai_chat_history").insert({
      user_id: userId,
      role: "user",
      content: message,
    });
    await supabase.from("ai_chat_history").insert({
      user_id: userId,
      role: "assistant",
      content: reply,
    });

    console.log("Returning success response");
    return new Response(JSON.stringify({ reply, limited: false }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI chat function error:", error);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ 
        reply: "Произошла внутренняя ошибка. Попробуйте позже.", 
        error: String(error),
        stack: error.stack
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
