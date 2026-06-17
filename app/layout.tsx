import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// [ПРОБЕЖАТЬСЯ] Подключаем шрифт Inter
const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "MasterENT — Подготовка к ЕНТ",
  description:
    "Интерактивная платформа для подготовки к ЕНТ с ИИ-аналитикой прогресса",
};

// [ПРОБЕЖАТЬСЯ] Корневой layout — оборачивает все страницы приложения
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {/* [ПРОБЕЖАТЬСЯ] Header отображается на всех страницах */}
        <Header />
        {/* [ПРОБЕЖАТЬСЯ] Основной контент страницы */}
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </body>
    </html>
  );
}