import Link from "next/link";

// [ПРОБЕЖАТЬСЯ] Главная страница (лендинг) — доступна всем пользователям
export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* [ПРОБЕЖАТЬСЯ] Герой-секция */}
      <section className="py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            MasterENT —{" "}
            <span className="text-primary-600">подготовка к ЕНТ</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Интерактивная платформа для школьников 10–11 классов и
            преподавателей. Тренируйтесь, отслеживайте прогресс и получайте
            персонализированные рекомендации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Начать подготовку
            </Link>
            <Link
              href="/auth/login"
              className="bg-white border-2 border-gray-300 hover:border-primary-400 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Войти
            </Link>
          </div>
        </div>
      </section>

      {/* [ПРОБЕЖАТЬСЯ] Секция с преимуществами */}
      <section className="py-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Почему MasterENT?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Аналитика прогресса
            </h3>
            <p className="text-gray-600">
              ИИ-анализ ваших ошибок и рекомендации по улучшению результатов
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              10 предметов
            </h3>
            <p className="text-gray-600">
              Все предметы ЕНТ в одном месте: от химии до всемирной истории
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Пробные тесты
            </h3>
            <p className="text-gray-600">
              Регулярные пробники с отслеживанием динамики результатов
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}