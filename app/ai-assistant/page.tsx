"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

// [ВАЖНО] AI Assistant — личный куратор для абитуриента
export default function AIAssistantPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // [ВАЖНО] Загружаем историю чата из БД при монтировании компонента
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth/login");
          return;
        }

        const { data: history, error: historyError } = await supabase
          .from("ai_chat_history")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true })
          .limit(50); // последние 50 сообщений

        if (historyError) {
          console.error("Error loading chat history:", historyError);
        }

        if (history && history.length > 0) {
          const loadedMessages = history.map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          }));
          setMessages(loadedMessages);
        } else {
          // [ПОЛЕЗНО] Если истории нет, показываем приветственное сообщение
          setMessages([
            { role: "assistant", content: "Привет! Я твой личный куратор по подготовке к ЕНТ. Можешь задать любой вопрос по предметам, получить советы по подготовке или попросить объяснить тему." }
          ]);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
        // [ПОЛЕЗНО] При ошибке показываем приветственное сообщение
        setMessages([
          { role: "assistant", content: "Привет! Я твой личный куратор по подготовке к ЕНТ. Можешь задать любой вопрос по предметам, получить советы по подготовке или попросить объяснить тему." }
        ]);
      } finally {
        setInitialized(true);
      }
    };

    loadHistory();
  }, [router]);

  useEffect(() => {
    if (initialized) {
      scrollToBottom();
    }
  }, [messages, initialized]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      // [ВАЖНО] Вызываем AI функцию
      console.log("Invoking ai-chat function...");
      const { data, error: fnError } = await supabase.functions.invoke("ai-chat", {
        body: {
          message: userMessage,
          userId: user.id,
          history: messages.slice(-10), // последние 10 сообщений для контекста
        },
      });

      if (fnError) {
        console.error("AI function error:", fnError);
        console.error("Error name:", fnError.name);
        console.error("Error message:", fnError.message);
        console.error("Error details:", JSON.stringify(fnError, null, 2));
        
        // [ПОЛЕЗНО] Более детальное сообщение об ошибке
        let errorMsg = "Ошибка вызова функции";
        if (fnError.message) errorMsg += `: ${fnError.message}`;
        if (fnError.name === "FunctionsException") {
          errorMsg += ". Убедитесь, что функция задеплоена: supabase functions deploy ai-chat";
        }
        throw new Error(errorMsg);
      }

      const assistantReply = data?.reply || "Извини, не смог обработать запрос. Попробуй ещё раз.";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
      
      // [ПОЛЕЗНО] Показываем ошибку от функции, если есть
      if (data?.error) {
        console.error("AI function returned error:", data.error);
      }
    } catch (err: any) {
      console.error("AI chat error:", err);
      const errorMessage = err.message || "Ошибка при обращении к ИИ. Попробуйте позже.";
      setError(errorMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: `Произошла ошибка: ${errorMessage}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">🤖 ИИ-куратор</h1>
        <p className="text-gray-500 mt-2">
          Задай вопрос по любому предмету, получи объяснение или совет по подготовке
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col" style={{ height: "600px" }}>
        {/* [ПРОБЕЖАТЬСЯ] Сообщения */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* [ПРОБЕЖАТЬСЯ] Ввод */}
        <div className="border-t border-gray-200 p-4">
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напиши вопрос..."
              rows={1}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}