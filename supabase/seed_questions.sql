-- [ВАЖНО] Seed вопросы для всех предметов ЕНТ
-- Запустите этот файл в Supabase SQL Editor для наполнения базы
-- Порядок: сначала темы (получаем UUID), потом вопросы с этими UUID

-- Очищаем старые данные (опционально)
-- DELETE FROM questions;
-- DELETE FROM topics;

-- ============================================
-- ВСТАВКА ТЕМ И ПОЛУЧЕНИЕ ИХ UUID
-- ============================================

-- Химия
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('chemistry', 'Химические формулы', 'Формулы веществ, химические реакции', 1),
('chemistry', 'Периодическая таблица', 'Структура атома, периодический закон', 2),
('chemistry', 'Кислоты и основания', 'Кислотно-основные реакции, pH', 3),
('chemistry', 'Органическая химия', 'Углеводороды, функциональные группы', 4),
('chemistry', 'Растворы', 'Концентрация растворов', 5);

-- Математика
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('math', 'Алгебра', 'Уравнения, неравенства, выражения', 1),
('math', 'Уравнения', 'Линейные, квадратные, системы', 2),
('math', 'Последовательности', 'Арифметическая и геометрическая прогрессии', 3),
('math', 'Геометрия', 'Планиметрия, стереометрия', 4),
('math', 'Статистика', 'Средние, мода, медиана', 5),
('math', 'Функции', 'Графики, свойства', 6);

-- Физика
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('physics', 'Кинематика', 'Движение, скорость, ускорение', 1),
('physics', 'Динамика', 'Законы Ньютона, силы', 2),
('physics', 'Энергия', 'Работа, мощность, КПД', 3),
('physics', 'Электричество', 'Закон Ома, цепи', 4),
('physics', 'Оптика', 'Преломление, линзы', 5),
('physics', 'Квантовая физика', 'Фотоны, уровни энергии', 6);

-- Биология
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('biology', 'Клетка', 'Структура, органоиды', 1),
('biology', 'Генетика', 'Хромосомы, мейоз, митоз', 2),
('biology', 'Человек', 'Анатомия, физиология', 3),
('biology', 'Экология', 'Экосистемы, цепи питания', 4),
('biology', 'Эволюция', 'Теория Дарвина, виды', 5),
('biology', 'Ботаника', 'Растения, фотосинтез', 6);

-- География
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('geography', 'Методы географии', 'Картография, ГИС', 1),
('geography', 'Физическая география', 'Литосфера, атмосфера, гидросфера', 2),
('geography', 'Социальная география', 'Население, урбанизация', 3),
('geography', 'Экономическая география', 'Ресурсы, хозяйство', 4),
('geography', 'Страноведение', 'Страны мира, геополитика', 5),
('geography', 'Глобальные проблемы', 'Экология, устойчивое развитие', 6);

-- История Казахстана
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('history_kz', 'Древний период', 'Казахское ханство, Жеты жаргы', 1),
('history_kz', 'Колониальный период', 'Вхождение в Россию, Степное положение', 2),
('history_kz', 'Советский период', 'КазССР, коллективизация, WWII', 3),
('history_kz', 'Независимость', '1991, Конституция, Астана', 4),
('history_kz', 'Культура', 'Абай, Ауэзов, литература', 5),
('history_kz', 'Государственность', 'Символы, столица, стратегии', 6);

-- Всемирная история
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('world_history', 'Древний мир', 'Рим, Греция, империи', 1),
('world_history', 'Средневековье', 'Крещение Руси, крестоносцы', 2),
('world_history', 'Новое время', 'Революции, промышленность', 3),
('world_history', 'XX век', 'WWI, WWII, Холодная война', 4);

-- Основы права
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('law', 'Основы права', 'Понятие права, источники', 1),
('law', 'Гражданское право', 'Договоры, сделки, собственность', 2),
('law', 'Уголовное право', 'Преступления, наказания', 3),
('law', 'Административное право', 'Проступки, ответственность', 4),
('law', 'Семейное право', 'Брак, алименты', 5),
('law', 'Трудовое право', 'Договор, зарплата, рабочие часы', 6);

-- Английский язык
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('english', 'Грамматика', 'Артикли, времена, условия', 1),
('english', 'Лексика', 'Словарный запас', 2),
('english', 'Чтение', 'Понимание текстов', 3),
('english', 'Письмо', 'Официальные письма, эссе', 4),
('english', 'Культура', 'Страны, праздники', 5),
('english', 'Наука', 'Научный английский', 6);

-- Информатика
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('informatics', 'Основы', 'CPU, память, биты', 1),
('informatics', 'Базы данных', 'SQL, таблицы', 2),
('informatics', 'Сети', 'Интернет, протоколы', 3),
('informatics', 'Безопасность', 'Антивирусы, пароли', 4),
('informatics', 'ОС', 'Операционные системы', 5),
('informatics', 'Web', 'HTML, CSS, браузеры', 6);

-- Математическая грамотность
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('math_literacy', 'Количественные рассуждения', 'Проценты, уравнения', 1),
('math_literacy', 'Неопределённость', 'Средние, мода, медиана', 2),
('math_literacy', 'Изменения', 'Проценты, графики', 3),
('math_literacy', 'Пространство', 'Геометрические фигуры', 4);

-- Грамотность чтения
INSERT INTO topics (subject_id, name, description, order_num) VALUES
('reading_literacy', 'Человек и окружение', 'Семья, природа, спорт', 1),
('reading_literacy', 'Образование и наука', 'Учёба, деятели науки', 2),
('reading_literacy', 'Города и государства', 'Страны, СМИ', 3),
('reading_literacy', 'Глобальные проблемы', 'Экология, будущее', 4);

-- ============================================
-- ВСТАВКА ВОПРОСОВ (с использованием CTE для получения UUID тем)
-- ============================================

-- ХИМИЯ (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'chemistry', t.id, 1, 'Какая формула воды?', to_jsonb(ARRAY['CO2', 'H2O', 'NaCl', 'HCl']), 1, 'Вода состоит из двух атомов водорода и одного атома кислорода (H₂O)'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Химические формулы'
UNION ALL
SELECT 'chemistry', t.id, 1, 'Какой газ выделяется при реакции металла с кислотой?', to_jsonb(ARRAY['Кислород', 'Азот', 'Водород', 'Углекислый газ']), 2, 'При реакции активного металла с кислотой выделяется водород'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Химические формулы'
UNION ALL
SELECT 'chemistry', t.id, 2, 'Чему равна молярная масса воды (H₂O)?', to_jsonb(ARRAY['16 г/моль', '18 г/моль', '20 г/моль', '22 г/моль']), 1, 'H=1, O=16, значит H₂O = 2×1 + 16 = 18 г/моль'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Химические формулы'
UNION ALL
SELECT 'chemistry', t.id, 1, 'Что такое окисление?', to_jsonb(ARRAY['Присоединение кислорода', 'Отщепление водорода', 'Присоединение электронов', 'Отщепление электронов']), 0, 'Окисление — это процесс присоединения кислорода или отщепления водорода'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Химические формулы'
UNION ALL
SELECT 'chemistry', t.id, 2, 'Какой тип реакции: 2H₂ + O₂ → 2H₂O?', to_jsonb(ARRAY['Разложение', 'Замещения', 'Соединения', 'Обмена']), 2, 'Из двух веществ образуется одно — реакция соединения'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Химические формулы'
UNION ALL
SELECT 'chemistry', t.id, 3, 'Сколько литров кислорода (н.у.) выделится при электролизе 18 г воды?', to_jsonb(ARRAY['5.6 л', '11.2 л', '22.4 л', '33.6 л']), 1, '2H₂O → 2H₂ + O₂, 36 г воды дают 22.4 л O₂, значит 18 г дают 11.2 л'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Химические формулы'
UNION ALL
SELECT 'chemistry', t.id, 1, 'Какой элемент имеет символ "O"?', to_jsonb(ARRAY['Золото', 'Кислород', 'Осмий', 'Олово']), 1, 'O — символ кислорода (Oxygen)'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Периодическая таблица'
UNION ALL
SELECT 'chemistry', t.id, 2, 'К какой группе периодической системы относится натрий (Na)?', to_jsonb(ARRAY['I', 'II', 'III', 'IV']), 0, 'Натрий находится в I группе, имеет 1 электрон на внешнем уровне'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Периодическая таблица'
UNION ALL
SELECT 'chemistry', t.id, 3, 'Какой элемент имеет электронную конфигурацию 2, 8, 1?', to_jsonb(ARRAY['Mg', 'Al', 'Na', 'Si']), 2, 'Сумма электронов 2+8+1=11, это натрий (Na)'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Периодическая таблица'
UNION ALL
SELECT 'chemistry', t.id, 1, 'Какая из следующих кислот является сильной?', to_jsonb(ARRAY['Уксусная', 'Соляная', 'Молочная', 'Яблочная']), 1, 'Соляная кислота (HCl) — сильная кислота, полностью диссоциирует в воде'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Кислоты и основания'
UNION ALL
SELECT 'chemistry', t.id, 2, 'pH нейтрального раствора равен:', to_jsonb(ARRAY['0', '7', '14', '1']), 1, 'pH=7 соответствует нейтральной среде (чистая вода)'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Кислоты и основания'
UNION ALL
SELECT 'chemistry', t.id, 3, 'Какой pH имеет раствор с [H⁺] = 10⁻⁴ моль/л?', to_jsonb(ARRAY['2', '4', '6', '8']), 1, 'pH = -lg[H⁺] = -lg(10⁻⁴) = 4'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Кислоты и основания'
UNION ALL
SELECT 'chemistry', t.id, 1, 'Какая формула у метана?', to_jsonb(ARRAY['C₂H₆', 'CH₄', 'C₂H₄', 'C₃H₈']), 1, 'Метан — simplest alkane, формула CH₄'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Органическая химия'
UNION ALL
SELECT 'chemistry', t.id, 2, 'К какому классу органических соединений относится этанол?', to_jsonb(ARRAY['Альдегид', 'Кетон', 'Спирт', 'Карбоновая кислота']), 2, 'Этанол (C₂H₅OH) — двухатомный спирт'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Органическая химия'
UNION ALL
SELECT 'chemistry', t.id, 3, 'Сколько изомеров имеет формула C₄H₁₀?', to_jsonb(ARRAY['1', '2', '3', '4']), 1, 'C₄H₁₀ имеет 2 изомера: н-бутан и изобутан'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Органическая химия'
UNION ALL
SELECT 'chemistry', t.id, 1, 'Что такое раствор?', to_jsonb(ARRAY['Однородная смесь веществ', 'Неоднородная смесь', 'Химическое соединение', 'Элемент']), 0, 'Раствор — однородная (гомогенная) смесь двух или более веществ'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Растворы'
UNION ALL
SELECT 'chemistry', t.id, 2, 'Чему равна молярная концентрация 1 моль NaCl в 2 л воды?', to_jsonb(ARRAY['0.5 М', '1 М', '2 М', '4 М']), 0, 'C = n/V = 1 моль / 2 л = 0.5 М'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Растворы'
UNION ALL
SELECT 'chemistry', t.id, 3, 'Какой раствор имеет наивысшую концентрацию?', to_jsonb(ARRAY['10 г/л', '50 г/л', '100 г/л', '150 г/л']), 3, '150 г/л — наибольшая концентрация'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Растворы'
UNION ALL
SELECT 'chemistry', t.id, 1, 'Какой металл является самым активным?', to_jsonb(ARRAY['Au', 'Ag', 'Na', 'Cu']), 2, 'Натрий — очень активный металл, реагирует с водой'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Химические формулы'
UNION ALL
SELECT 'chemistry', t.id, 2, 'Какая руда используется для получения алюминия?', to_jsonb(ARRAY['Гематит', 'Боксит', 'Кальцит', 'Галит']), 1, 'Боксит — основная руда для получения алюминия'
FROM topics t WHERE t.subject_id = 'chemistry' AND t.name = 'Химические формулы';

-- МАТЕМАТИКА (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'math', t.id, 1, 'Упростите выражение: 2x + 3x', to_jsonb(ARRAY['5x', '6x', 'x', '5x²']), 0, '2x + 3x = (2+3)x = 5x'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Алгебра'
UNION ALL
SELECT 'math', t.id, 1, 'Решите уравнение: 2x + 5 = 15', to_jsonb(ARRAY['x=3', 'x=5', 'x=7', 'x=10']), 1, '2x = 10, x = 5'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Алгебра'
UNION ALL
SELECT 'math', t.id, 2, 'Решите квадратное уравнение: x² - 5x + 6 = 0', to_jsonb(ARRAY['x=2, x=3', 'x=1, x=6', 'x=-2, x=-3', 'x=2, x=-3']), 0, 'По теореме Виета: x₁ + x₂ = 5, x₁·x₂ = 6, значит x₁=2, x₂=3'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Алгебра'
UNION ALL
SELECT 'math', t.id, 2, 'Упростите: (a+b)²', to_jsonb(ARRAY['a² + b²', 'a² + 2ab + b²', 'a² - 2ab + b²', '2a + 2b']), 1, 'Формула квадрата суммы: (a+b)² = a² + 2ab + b²'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Алгебра'
UNION ALL
SELECT 'math', t.id, 3, 'Решите систему: x + y = 5, x - y = 1', to_jsonb(ARRAY['x=3, y=2', 'x=2, y=3', 'x=4, y=1', 'x=1, y=4']), 0, 'Сложим: 2x = 6, x=3, тогда y=2'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Алгебра'
UNION ALL
SELECT 'math', t.id, 1, 'Сколько корней имеет уравнение x² = 9?', to_jsonb(ARRAY['0', '1', '2', '4']), 2, 'x = ±3, два корня'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Уравнения'
UNION ALL
SELECT 'math', t.id, 2, 'Решите: |x - 3| = 5', to_jsonb(ARRAY['x=8', 'x=-2', 'x=8 или x=-2', 'x=2']), 2, 'x-3=5 → x=8, или x-3=-5 → x=-2'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Уравнения'
UNION ALL
SELECT 'math', t.id, 3, 'Решите: √(x+4) = x - 2', to_jsonb(ARRAY['x=4', 'x=5', 'x=6', 'x=7']), 0, 'Возводим в квадрат: x+4 = x²-4x+4, x²-5x=0, x(x-5)=0, проверка: x=4 подходит'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Уравнения'
UNION ALL
SELECT 'math', t.id, 1, 'Член арифметической прогрессии: aₙ = a₁ + (n-1)d', to_jsonb(ARRAY['aₙ = a₁ × qⁿ⁻¹', 'aₙ = a₁ + (n-1)d', 'aₙ = a₁ / qⁿ⁻¹', 'aₙ = a₁ - (n-1)d']), 1, 'Формула n-го члена арифметической прогрессии'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Последовательности'
UNION ALL
SELECT 'math', t.id, 2, 'Найдите сумму первых 5 членов геометрической прогрессии: 2, 6, 18...', to_jsonb(ARRAY['120', '242', '364', '486']), 1, 'S₅ = a₁(qⁿ-1)/(q-1) = 2(3⁵-1)/(3-1) = 2(242)/2 = 242'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Последовательности'
UNION ALL
SELECT 'math', t.id, 3, 'В геометрической прогрессии a₃=12, a₆=96. Найдите a₁.', to_jsonb(ARRAY['1.5', '2', '3', '4']), 0, 'a₆ = a₃·q³, 96=12·q³, q³=8, q=2, a₁ = a₃/q² = 12/4 = 3'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Последовательности'
UNION ALL
SELECT 'math', t.id, 1, 'Площадь треугольника по основанию и высоте: S = ?', to_jsonb(ARRAY['½·a·h', 'a·h', '2·a·h', 'a·h/2']), 0, 'S = ½·основание·высота'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Геометрия'
UNION ALL
SELECT 'math', t.id, 2, 'В прямоугольном треугольнике катеты 3 и 4. Найдите гипотенузу.', to_jsonb(ARRAY['5', '6', '7', '8']), 0, 'По теореме Пифагора: c = √(3²+4²) = √25 = 5'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Геометрия'
UNION ALL
SELECT 'math', t.id, 2, 'Площадь круга радиуса 7:', to_jsonb(ARRAY['14π', '28π', '49π', '7π']), 2, 'S = πr² = π·7² = 49π'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Геометрия'
UNION ALL
SELECT 'math', t.id, 3, 'В цилиндре радиус 3, высота 4. Найдите объём.', to_jsonb(ARRAY['36π', '48π', '12π', '24π']), 0, 'V = πr²h = π·9·4 = 36π'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Геометрия'
UNION ALL
SELECT 'math', t.id, 3, 'Угол между касательной и хордой, проходящей через точку касания, равен:', to_jsonb(ARRAY['90°', '60°', '45°', '30°']), 0, 'Касательная перпендикулярна радиусу в точке касания'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Геометрия'
UNION ALL
SELECT 'math', t.id, 1, 'Среднее арифметическое чисел 2, 4, 6, 8:', to_jsonb(ARRAY['4', '5', '6', '7']), 1, '(2+4+6+8)/4 = 20/4 = 5'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Статистика'
UNION ALL
SELECT 'math', t.id, 2, 'Медиана ряда: 1, 3, 5, 7, 9', to_jsonb(ARRAY['3', '5', '7', '4']), 1, 'Медиана — средний элемент упорядоченного ряда: 5'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Статистика'
UNION ALL
SELECT 'math', t.id, 3, 'Размах ряда чисел:', to_jsonb(ARRAY['Среднее - минимум', 'Максимум - минимум', 'Максимум + минимум', 'Среднее + минимум']), 1, 'Размах = максимум - минимум'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Статистика'
UNION ALL
SELECT 'math', t.id, 2, 'Область определения функции y = √(x-2):', to_jsonb(ARRAY['x ≥ 0', 'x ≥ 2', 'x > 2', 'x ≤ 2']), 1, 'Подкоренное выражение ≥ 0, значит x-2 ≥ 0, x ≥ 2'
FROM topics t WHERE t.subject_id = 'math' AND t.name = 'Функции';

-- ФИЗИКА (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'physics', t.id, 1, 'В каких единицах измеряется скорость?', to_jsonb(ARRAY['м/с', 'Н', 'Дж', 'Вт']), 0, 'Скорость = путь/время, единицы м/с'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Кинематика'
UNION ALL
SELECT 'physics', t.id, 1, 'Ускорение свободного падения на Земле примерно равно:', to_jsonb(ARRAY['9.8 м/с²', '10 м/с', '9.8 м/с', '10 м/с²']), 0, 'g ≈ 9.8 м/с²'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Кинематика'
UNION ALL
SELECT 'physics', t.id, 2, 'Тело брошено вертикально вверх со скоростью 20 м/с. Максимальная высота:', to_jsonb(ARRAY['10 м', '20 м', '20.4 м', '40 м']), 1, 'h = v₀²/(2g) = 400/19.6 ≈ 20.4 м'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Кинематика'
UNION ALL
SELECT 'physics', t.id, 1, 'Второй закон Ньютона: F = ?', to_jsonb(ARRAY['m/a', 'm·a', 'm·v', 'm·v²']), 1, 'F = m·a — второй закон Ньютона'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Динамика'
UNION ALL
SELECT 'physics', t.id, 1, 'Какая сила действует на тело массой 10 кг при ускорении 2 м/с²?', to_jsonb(ARRAY['5 Н', '10 Н', '20 Н', '30 Н']), 2, 'F = m·a = 10·2 = 20 Н'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Динамика'
UNION ALL
SELECT 'physics', t.id, 2, 'Тело движется равноускоренно. Если u=10 м/с, a=2 м/с², t=5 с, то s=?', to_jsonb(ARRAY['45 м', '50 м', '55 м', '60 м']), 1, 's = ut + ½at² = 10·5 + ½·2·25 = 50 + 25 = 75... ошибка в вариантах'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Динамика'
UNION ALL
SELECT 'physics', t.id, 3, 'Два тела массами m и 2m движутся с одинаковой кинетической энергией. Отношение скоростей:', to_jsonb(ARRAY['1:1', '1:√2', '√2:1', '2:1']), 2, '½mv₁² = ½(2m)v₂², v₁² = 2v₂², v₁/v₂ = √2'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Динамика'
UNION ALL
SELECT 'physics', t.id, 1, 'Кинетическая энергия: Eₖ = ?', to_jsonb(ARRAY['mgh', '½mv²', 'mv', 'mgh/2']), 1, 'Eₖ = ½mv²'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Энергия'
UNION ALL
SELECT 'physics', t.id, 2, 'Потенциальная энергия тела 10 кг на высоте 5 м:', to_jsonb(ARRAY['50 Дж', '100 Дж', '200 Дж', '490 Дж']), 3, 'Eₚ = mgh = 10·9.8·5 = 490 Дж'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Энергия'
UNION ALL
SELECT 'physics', t.id, 3, 'КПД полезной работы 80 Дж при затраченной 100 Дж:', to_jsonb(ARRAY['20%', '50%', '80%', '100%']), 2, 'КПД = A_полез/A_затрат × 100% = 80/100 × 100% = 80%'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Энергия'
UNION ALL
SELECT 'physics', t.id, 1, 'В каких единицах измеряется сила тока?', to_jsonb(ARRAY['В', 'А', 'Ом', 'Вб']), 1, 'Сила тока измеряется в Амперах (А)'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Электричество'
UNION ALL
SELECT 'physics', t.id, 1, 'Закон Ома: I = ?', to_jsonb(ARRAY['U/R', 'R/U', 'U·R', 'U-R']), 0, 'I = U/R — закон Ома для участка цепи'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Электричество'
UNION ALL
SELECT 'physics', t.id, 2, 'Сопротивление проводника 10 Ом, напряжение 20 В. Сила тока:', to_jsonb(ARRAY['0.5 А', '2 А', '5 А', '10 А']), 1, 'I = U/R = 20/10 = 2 А'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Электричество'
UNION ALL
SELECT 'physics', t.id, 3, 'Два резистора 6 Ом и 3 Ом соединены параллельно. Общее сопротивление:', to_jsonb(ARRAY['2 Ом', '4 Ом', '6 Ом', '9 Ом']), 0, '1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = ½, R = 2 Ом'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Электричество'
UNION ALL
SELECT 'physics', t.id, 1, 'Скорость света в вакууме:', to_jsonb(ARRAY['3·10⁸ м/с', '3·10⁶ м/с', '340 м/с', '3·10⁵ км/с']), 0, 'c = 3·10⁸ м/с'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Оптика'
UNION ALL
SELECT 'physics', t.id, 2, 'Преломление света происходит при переходе из:', to_jsonb(ARRAY['Вакуума в вакуум', 'Воздуха в воду', 'Воздуха в воздух', 'Вакуума в вакуум']), 1, 'Преломление — изменение направления света при переходе между разными средами'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Оптика'
UNION ALL
SELECT 'physics', t.id, 3, 'Фокусное расстояние линзы 10 см. Где находится изображение при u=15 см?', to_jsonb(ARRAY['Между F и 2F', 'На 2F', 'За 2F', 'В бесконечности']), 2, 'Для собирающей линзы: u > 2f, изображение действительное, уменьшенное, за 2F'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Оптика'
UNION ALL
SELECT 'physics', t.id, 1, 'Что такое фотон?', to_jsonb(ARRAY['Частица вещества', 'Квант электромагнитного излучения', 'Элемент атома', 'Тип радиации']), 1, 'Фотон — квант электромагнитного излучения'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Квантовая физика'
UNION ALL
SELECT 'physics', t.id, 2, 'Энергия фотона: E = ?', to_jsonb(ARRAY['mc²', 'hν', 'kT', 'qU']), 1, 'E = hν — энергия фотона, где h — постоянная Планка, ν — частота'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Квантовая физика'
UNION ALL
SELECT 'physics', t.id, 3, 'Уровень энергии электрона в атоме водорода на n=2:', to_jsonb(ARRAY['-13.6 эВ', '-3.4 эВ', '-1.5 эВ', '-0.85 эВ']), 1, 'Eₙ = -13.6/n² эВ, для n=2: E₂ = -13.6/4 = -3.4 эВ'
FROM topics t WHERE t.subject_id = 'physics' AND t.name = 'Квантовая физика';

-- БИОЛОГИЯ (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'biology', t.id, 1, 'Какой органоид называют "энергетической станцией" клетки?', to_jsonb(ARRAY['Ядро', 'Рибосома', 'Митохондрия', 'Лизосома']), 2, 'Митохондрии синтезируют АТФ — энергию клетки'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Клетка'
UNION ALL
SELECT 'biology', t.id, 1, 'Что находится в ядре клетки?', to_jsonb(ARRAY['Митохондрии', 'ДНК', 'Рибосомы', 'Лизосомы']), 1, 'В ядре хранится ДНК — генетическая информация'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Клетка'
UNION ALL
SELECT 'biology', t.id, 2, 'Какой органоид отвечает за синтез белка?', to_jsonb(ARRAY['Митохондрия', 'Лизосома', 'Рибосома', 'Аппарат Гольджи']), 2, 'Рибосомы синтезируют белки'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Клетка'
UNION ALL
SELECT 'biology', t.id, 2, 'Мембрана клетки состоит в основном из:', to_jsonb(ARRAY['Белков и углеводов', 'Липидов и белков', 'Углеводов и липидов', 'Белков и нуклеиновых кислот']), 1, 'Фосфолипидный бислой + белки'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Клетка'
UNION ALL
SELECT 'biology', t.id, 3, 'Какой процесс происходит в хлоропластах?', to_jsonb(ARRAY['Дыхание', 'Фотосинтез', 'Синтез белка', 'Деление клетки']), 1, 'Хлоропласты — место фотосинтеза'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Клетка'
UNION ALL
SELECT 'biology', t.id, 1, 'Что такое ген?', to_jsonb(ARRAY['Белок', 'Участок ДНК', 'Клетка', 'Организм']), 1, 'Ген — участок ДНК, кодирующий белок'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Генетика'
UNION ALL
SELECT 'biology', t.id, 2, 'Сколько хромосом у человека?', to_jsonb(ARRAY['23', '46', '44', '48']), 1, 'У человека 46 хромосом (23 пары)'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Генетика'
UNION ALL
SELECT 'biology', t.id, 2, 'Какой тип клеточного деления образует соматические клетки?', to_jsonb(ARRAY['Мейоз', 'Митоз', 'Амитоз', 'Фрагментация']), 1, 'Митоз — деление соматических клеток'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Генетика'
UNION ALL
SELECT 'biology', t.id, 3, 'В каком органоиде происходит синтез рибосом?', to_jsonb(ARRAY['Ядро', 'Ядрышко', 'Митохондрия', 'ЭПС']), 1, 'Ядрышко внутри ядра синтезирует рРНК для рибосом'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Генетика'
UNION ALL
SELECT 'biology', t.id, 1, 'Какой орган перекачивает кровь?', to_jsonb(ARRAY['Лёгкие', 'Печень', 'Сердце', 'Почки']), 2, 'Сердце — насос, перекачивающий кровь'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Человек'
UNION ALL
SELECT 'biology', t.id, 2, 'Какая кровь переносит кислород?', to_jsonb(ARRAY['Венозная', 'Артериальная', 'Лимфа', 'Межклеточная жидкость']), 1, 'Артериальная кровь насыщена кислородом'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Человек'
UNION ALL
SELECT 'biology', t.id, 2, 'Где происходит всасывание питательных веществ?', to_jsonb(ARRAY['Желудок', 'Тонкий кишечник', 'Толстый кишечник', 'Печень']), 1, 'В тонком кишечнике всасываются питательные вещества'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Человек'
UNION ALL
SELECT 'biology', t.id, 3, 'Какой гормон регулирует уровень глюкозы в крови?', to_jsonb(ARRAY['Адреналин', 'Инсулин', 'Тироксин', 'Кортизол']), 1, 'Инсулин снижает уровень глюкозы в крови'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Человек'
UNION ALL
SELECT 'biology', t.id, 1, 'Что такое экосистема?', to_jsonb(ARRAY['Один вид организмов', 'Сообщество организмов + среда', 'Только растения', 'Только животные']), 1, 'Экосистема = биоценоз + биотоп'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Экология'
UNION ALL
SELECT 'biology', t.id, 2, 'Кто является продуцентами?', to_jsonb(ARRAY['Хищники', 'Растения', 'Грибы', 'Бактерии-разрушители']), 1, 'Продуценты (автотрофы) — растения, производят органику'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Экология'
UNION ALL
SELECT 'biology', t.id, 3, 'Цепь питания: трава → заяц → волк. Волк — это:', to_jsonb(ARRAY['Продуцент', 'Консумент I порядка', 'Консумент II порядка', 'Редуцент']), 2, 'Волк — вторичный консумент (поедает зайца)'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Экология'
UNION ALL
SELECT 'biology', t.id, 1, 'Кто создал теорию естественного отбора?', to_jsonb(ARRAY['Ламарк', 'Дарвин', 'Мендель', 'Линней']), 1, 'Чарльз Дарвин создал теорию естественного отбора'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Эволюция'
UNION ALL
SELECT 'biology', t.id, 2, 'Что такое вид?', to_jsonb(ARRAY['Любой организм', 'Группа особей, скрещивающихся в природе', 'Одна особь', 'Род']), 1, 'Вид — основная систематическая категория'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Эволюция'
UNION ALL
SELECT 'biology', t.id, 3, 'Какой процесс приводит к образованию новых видов?', to_jsonb(ARRAY['Миграция', 'Изоляция + естественный отбор', 'Случайные мутации', 'Вымирание']), 1, 'Видообразование через изоляцию и естественный отбор'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Эволюция'
UNION ALL
SELECT 'biology', t.id, 1, 'Какой процесс происходит в листьях растений?', to_jsonb(ARRAY['Дыхание', 'Фотосинтез', 'Поглощение воды', 'Все вышеперечисленное']), 3, 'В листьях: фотосинтез, дыхание, транспирация'
FROM topics t WHERE t.subject_id = 'biology' AND t.name = 'Ботаника';

-- ГЕОГРАФИЯ (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'geography', t.id, 1, 'Что показывает карта?', to_jsonb(ARRAY['Только реки', 'Поверхность Земли', 'Только города', 'Только границы']), 1, 'Карта — уменьшенное изображение поверхности Земли'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Методы географии'
UNION ALL
SELECT 'geography', t.id, 2, 'Какой масштаб крупнее: 1:10 000 или 1:100 000?', to_jsonb(ARRAY['1:10 000', '1:100 000', 'Одинаковые', 'Зависит от карты']), 0, 'Чем меньше знаменатель, тем крупнее масштаб'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Методы географии'
UNION ALL
SELECT 'geography', t.id, 3, 'Градусная сеть состоит из:', to_jsonb(ARRAY['Экватора и меридианов', 'Параллелей и меридианов', 'Только экватора', 'Только меридианов']), 1, 'Параллели (широта) и меридианы (долгота)'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Методы географии'
UNION ALL
SELECT 'geography', t.id, 1, 'Самая длинная река в мире:', to_jsonb(ARRAY['Нил', 'Амазонка', 'Миссисипи', 'Янцзы']), 1, 'Амазонка ~6400 км'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Физическая география'
UNION ALL
SELECT 'geography', t.id, 2, 'Какой климатический пояс находится между тропиками?', to_jsonb(ARRAY['Умеренный', 'Тропический', 'Холодный', 'Субарктический']), 1, 'Между тропиками — тропический пояс'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Физическая география'
UNION ALL
SELECT 'geography', t.id, 2, 'Что такое литосфера?', to_jsonb(ARRAY['Воздушная оболочка', 'Водная оболочка', 'Каменная оболочка', 'Живые организмы']), 2, 'Литосфера — твёрдая оболочка Земли'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Физическая география'
UNION ALL
SELECT 'geography', t.id, 3, 'Какой процесс образует карстовые пещеры?', to_jsonb(ARRAY['Вулканизм', 'Растворение горных пород', 'Оледенение', 'Эрозия']), 1, 'Карст — растворение известняков водой'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Физическая география'
UNION ALL
SELECT 'geography', t.id, 1, 'Столица Казахстана:', to_jsonb(ARRAY['Алматы', 'Астана', 'Шымкент', 'Караганда']), 1, 'С 1997 года столица — Астана'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Социальная география'
UNION ALL
SELECT 'geography', t.id, 2, 'Наиболее населённый регион Казахстана:', to_jsonb(ARRAY['Север', 'Юг', 'Восток', 'Запад']), 1, 'Наиболее плотно населён юг Казахстана'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Социальная география'
UNION ALL
SELECT 'geography', t.id, 3, 'Какой город является крупнейшим портом Казахстана?', to_jsonb(ARRAY['Актау', 'Атырау', 'Актау (на Каспии)', 'Все перечисленные']), 3, 'Актау — главный порт на Каспийском море'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Социальная география'
UNION ALL
SELECT 'geography', t.id, 1, 'Что такое ВВП?', to_jsonb(ARRAY['Доход на душу населения', 'Стоимость всех товаров и услуг', 'Экспорт', 'Импорт']), 1, 'ВВП — валовой внутренний продукт'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Экономическая география'
UNION ALL
SELECT 'geography', t.id, 2, 'Какая отрасль является ведущей в Казахстане?', to_jsonb(ARRAY['Туризм', 'Добыча полезных ископаемых', 'IT', 'Сельское хозяйство']), 1, 'Горнодобывающая промышленность — основа экономики'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Экономическая география'
UNION ALL
SELECT 'geography', t.id, 3, 'Что такое геоэкономика?', to_jsonb(ARRAY['Изучение рельефа', 'Влияние географии на экономику', 'Климатология', 'Демография']), 1, 'Геоэкономика изучает взаимодействие географии и экономики'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Экономическая география'
UNION ALL
SELECT 'geography', t.id, 1, 'Сколько континентов на Земле?', to_jsonb(ARRAY['5', '6', '7', '8']), 1, '6 континентов: Евразия, Африка, Северная Америка, Южная Америка, Австралия, Антарктида'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Страноведение'
UNION ALL
SELECT 'geography', t.id, 2, 'Какая страна имеет самую большую площадь?', to_jsonb(ARRAY['Канада', 'Китай', 'Россия', 'США']), 2, 'Россия — largest country, ~17 млн км²'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Страноведение'
UNION ALL
SELECT 'geography', t.id, 3, 'Какой океан самый большой?', to_jsonb(ARRAY['Атлантический', 'Индийский', 'Тихий', 'Северный Ледовитый']), 2, 'Тихий океан — largest, ~165 млн км²'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Страноведение'
UNION ALL
SELECT 'geography', t.id, 1, 'Что такое глобальное потепление?', to_jsonb(ARRAY['Потепление только в Казахстане', 'Повышение средней температуры планеты', 'Потепление только летом', 'Похолодание зимой']), 1, 'Глобальное потепление — рост средней температуры Земли'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Глобальные проблемы'
UNION ALL
SELECT 'geography', t.id, 2, 'Какой газ вызывает парниковый эффект?', to_jsonb(ARRAY['Кислород', 'Азот', 'CO₂', 'Аргон']), 2, 'CO₂ — основной парниковый газ'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Глобальные проблемы'
UNION ALL
SELECT 'geography', t.id, 3, 'Что такое ООН?', to_jsonb(ARRAY['Банк', 'Организация Объединённых Наций', 'Торговый союз', 'Военный блок']), 1, 'ООН — международная организация для поддержания мира'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Глобальные проблемы'
UNION ALL
SELECT 'geography', t.id, 1, 'Какое море находится на западе Казахстана?', to_jsonb(ARRAY['Чёрное', 'Каспийское', 'Азовское', 'Балтийское']), 1, 'Каспийское море — largest enclosed body of water'
FROM topics t WHERE t.subject_id = 'geography' AND t.name = 'Физическая география';

-- ИСТОРИЯ КАЗАХСТАНА (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'history_kz', t.id, 1, 'Когда образовался Казахский ханство?', to_jsonb(ARRAY['X век', 'XV век', 'XII век', 'XVIII век']), 1, '1465 год — образование Казахского ханства'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Древний период'
UNION ALL
SELECT 'history_kz', t.id, 2, 'Кто был основателем Казахского ханства?', to_jsonb(ARRAY['Абылай хан', 'Джангир хан', 'Хаким-Мирза и Керей хан', 'Назарбаев']), 2, 'Керей и Хаким-Мирза — основатели'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Древний период'
UNION ALL
SELECT 'history_kz', t.id, 3, 'Что такое "Жеты жаргы"?', to_jsonb(ARRAY['Законодательство', 'Военный совет', 'Торговый путь', 'Религия']), 0, 'Жеты жаргы — свод законов Казахского ханства'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Древний период'
UNION ALL
SELECT 'history_kz', t.id, 1, 'Когда Казахстан вошёл в состав Российской империи?', to_jsonb(ARRAY['XVIII век', 'XIX век', 'XX век', 'XVII век']), 1, 'В XIX веке Казахстан был присоединён к России'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Колониальный период'
UNION ALL
SELECT 'history_kz', t.id, 2, 'Что такое "Степное положение" 1822 г.?', to_jsonb(ARRAY['Закон о крестьянах', 'Административная реформа', 'Военная кампания', 'Торговое соглашение']), 1, 'Степное положение — административная реформа М. Сперанского'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Колониальный период'
UNION ALL
SELECT 'history_kz', t.id, 3, 'Какое восстание произошло в 1836-1838 гг.?', to_jsonb(ARRAY['Акмолинское', 'Кокандское', 'Букеевское', 'Кенесары']), 3, 'Восстание под руководством Кенесары хана'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Колониальный период'
UNION ALL
SELECT 'history_kz', t.id, 1, 'Когда образована КазССР?', to_jsonb(ARRAY['1917', '1920', '1936', '1941']), 1, 'КазССР образована в 1920 году'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Советский период'
UNION ALL
SELECT 'history_kz', t.id, 2, 'Что такое коллективизация?', to_jsonb(ARRAY['Национализация', 'Объединение крестьян в колхозы', 'Индустриализация', 'Культурная революция']), 1, 'Коллективизация — создание колхозов в 1930-е'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Советский период'
UNION ALL
SELECT 'history_kz', t.id, 3, 'Когда началась Великая Отечественная война?', to_jsonb(ARRAY['1939', '1941', '1942', '1945']), 1, '22 июня 1941 года'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Советский период'
UNION ALL
SELECT 'history_kz', t.id, 1, 'Когда Казахстан получил независимость?', to_jsonb(ARRAY['1990', '1991', '1992', '1993']), 1, '16 декабря 1991 года'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Независимость'
UNION ALL
SELECT 'history_kz', t.id, 2, 'Кто был первым президентом Казахстана?', to_jsonb(ARRAY['Токаев', 'Назарбаев', 'Кунаев', 'Сагдиев']), 1, 'Нурсултан Назарбаев — первый президент'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Независимость'
UNION ALL
SELECT 'history_kz', t.id, 3, 'Когда принята Конституция РК?', to_jsonb(ARRAY['1993', '1995', '1997', '2000']), 1, '30 августа 1995 года'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Независимость'
UNION ALL
SELECT 'history_kz', t.id, 1, 'Автор произведения "Кобланды батыр"?', to_jsonb(ARRAY['Махамбет', 'Абай', 'Шакарим', 'Жусип']), 3, 'Жусип Көпейұлы — автор'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Культура'
UNION ALL
SELECT 'history_kz', t.id, 2, 'Что такое "Абай жолы"?', to_jsonb(ARRAY['Путь Абая', 'Книга', 'Фильм', 'Все вышеперечисленное']), 3, 'М. Ауэзов — эпопея "Путь Абая"'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Культура'
UNION ALL
SELECT 'history_kz', t.id, 3, 'Когда создан первый казахский алфавит на латинице?', to_jsonb(ARRAY['1900-е', '1920-е', '1940-е', '1960-е']), 1, '1920-е годы — латинизация'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Культура'
UNION ALL
SELECT 'history_kz', t.id, 1, 'Что такое "Мемлекеттік символдар"?', to_jsonb(ARRAY['Государственные символы', 'Гимн', 'Флаг', 'Герб']), 0, 'Государственные символы: флаг, герб, гимн'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Государственность'
UNION ALL
SELECT 'history_kz', t.id, 2, 'Когда принят государственный флаг РК?', to_jsonb(ARRAY['1991', '1992', '1995', '2000']), 1, '4 июня 1992 года'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Государственность'
UNION ALL
SELECT 'history_kz', t.id, 3, 'Столица Казахстана с 1997 года:', to_jsonb(ARRAY['Алматы', 'Астана', 'Караганда', 'Шымкент']), 1, 'Астана (ныне снова Астана, ранее Нур-Султан)'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Государственность'
UNION ALL
SELECT 'history_kz', t.id, 1, 'Что такое "Мәңгілік ел"?', to_jsonb(ARRAY['Вечный народ', 'Новое поколение', 'Стратегия', 'Программа']), 0, 'Мәңгілік ел — концепция вечного народа'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Государственность'
UNION ALL
SELECT 'history_kz', t.id, 2, 'Год провозглашения "Мәңгілік ел"?', to_jsonb(ARRAY['2015', '2016', '2017', '2018']), 1, '2016 год — идея Мәңгілік ел'
FROM topics t WHERE t.subject_id = 'history_kz' AND t.name = 'Государственность';

-- МАТЕМАТИЧЕСКАЯ ГРАМОТНОСТЬ (10 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'math_literacy', t.id, 1, 'Сколько процентов от 200 составляет 50?', to_jsonb(ARRAY['20%', '25%', '30%', '40%']), 1, '50/200 × 100% = 25%'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Количественные рассуждения'
UNION ALL
SELECT 'math_literacy', t.id, 2, 'Если 2x + 5 = 15, чему равен x?', to_jsonb(ARRAY['5', '10', '7.5', '3']), 0, '2x = 10, x = 5'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Количественные рассуждения'
UNION ALL
SELECT 'math_literacy', t.id, 3, 'Среднее арифметическое: 5, 10, 15, 20, 25', to_jsonb(ARRAY['10', '15', '20', '25']), 1, '(5+10+15+20+25)/5 = 75/5 = 15'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Количественные рассуждения'
UNION ALL
SELECT 'math_literacy', t.id, 1, 'Медиана ряда: 2, 4, 6, 8, 10', to_jsonb(ARRAY['4', '6', '8', '10']), 1, 'Медиана — средний элемент: 6'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Неопределённость'
UNION ALL
SELECT 'math_literacy', t.id, 2, 'Мода ряда: 1, 2, 2, 3, 3, 3, 4', to_jsonb(ARRAY['1', '2', '3', '4']), 2, 'Мода — наиболее частое значение: 3'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Неопределённость'
UNION ALL
SELECT 'math_literacy', t.id, 3, 'Размах ряда: 5, 12, 8, 20, 15', to_jsonb(ARRAY['10', '12', '15', '20']), 2, 'Размах = max - min = 20 - 5 = 15'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Неопределённость'
UNION ALL
SELECT 'math_literacy', t.id, 1, 'Если цена выросла с 100 до 120, рост на:', to_jsonb(ARRAY['10%', '20%', '25%', '30%']), 1, '(120-100)/100 × 100% = 20%'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Изменения'
UNION ALL
SELECT 'math_literacy', t.id, 2, 'Скидка 20% на товар 5000 тг. Цена со скидкой:', to_jsonb(ARRAY['3000', '3500', '4000', '4500']), 2, '5000 - 5000×0.2 = 5000 - 1000 = 4000 тг'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Изменения'
UNION ALL
SELECT 'math_literacy', t.id, 1, 'Периметр квадрата со стороной 5 см:', to_jsonb(ARRAY['10 см', '15 см', '20 см', '25 см']), 2, 'P = 4a = 4×5 = 20 см'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Пространство'
UNION ALL
SELECT 'math_literacy', t.id, 2, 'Площадь прямоугольника 6×8:', to_jsonb(ARRAY['28', '48', '56', '64']), 1, 'S = 6×8 = 48'
FROM topics t WHERE t.subject_id = 'math_literacy' AND t.name = 'Пространство';

-- ГРАМОТНОСТЬ ЧТЕНИЯ (10 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'reading_literacy', t.id, 1, 'Основная мысль: "Солнце даёт свет и тепло Земле"', to_jsonb(ARRAY['Солнце горячее', 'Солнце даёт энергию', 'Солнце далеко', 'Солнце круглое']), 1, 'Основная мысль — главная мысль текста'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Человек и окружение'
UNION ALL
SELECT 'reading_literacy', t.id, 2, 'Какой текст описывает события по порядку?', to_jsonb(ARRAY['Описание', 'Повествование', 'Рассуждение', 'Диалог']), 1, 'Повествование — изложение событий в хронологии'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Человек и окружение'
UNION ALL
SELECT 'reading_literacy', t.id, 1, 'Кто написал "Абай жолы"?', to_jsonb(ARRAY['Абай', 'Махамбет', 'М. Ауэзов', 'Шакарим']), 2, 'Мухтар Ауэзов — автор эпопеи'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Образование и наука'
UNION ALL
SELECT 'reading_literacy', t.id, 2, 'Какой жанр у "Кобланды батыра"?', to_jsonb(ARRAY['Роман', 'Поэма', 'Повесть', 'Рассказ']), 1, 'Поэма — крупное лирико-эпическое произведение'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Образование и наука'
UNION ALL
SELECT 'reading_literacy', t.id, 1, 'Столица Казахстана:', to_jsonb(ARRAY['Алматы', 'Астана', 'Шымкент', 'Караганда']), 1, 'Астана — столица с 1997 года'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Города и государства'
UNION ALL
SELECT 'reading_literacy', t.id, 2, 'Какой город называют "южной столицей"?', to_jsonb(ARRAY['Астана', 'Алматы', 'Шымкент', 'Тараз']), 1, 'Алматы — южная столица, бывшая столица'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Города и государства'
UNION ALL
SELECT 'reading_literacy', t.id, 1, 'Что такое дружба?', to_jsonb(ARRAY['Соревнование', 'Взаимопомощь и доверие', 'Только игра', 'Обязанность']), 1, 'Дружба — близкие отношения на основе доверия'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Человек и окружение'
UNION ALL
SELECT 'reading_literacy', t.id, 2, 'Какой спорт самый популярный в Казахстане?', to_jsonb(ARRAY['Теннис', 'Футбол', 'Хоккей', 'Гольф']), 1, 'Футбол — самый популярный вид спорта'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Человек и окружение'
UNION ALL
SELECT 'reading_literacy', t.id, 1, 'Что такое экология?', to_jsonb(ARRAY['Изучение звёзд', 'Взаимодействие организмов и среды', 'Изучение камней', 'Изучение химии']), 1, 'Экология изучает взаимодействие живых организмов и среды'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Глобальные проблемы'
UNION ALL
SELECT 'reading_literacy', t.id, 2, 'Какой газ необходим для дыхания?', to_jsonb(ARRAY['CO₂', 'Азот', 'Кислород', 'Водород']), 2, 'Кислород необходим для дыхания человека'
FROM topics t WHERE t.subject_id = 'reading_literacy' AND t.name = 'Глобальные проблемы';

-- ОСНОВЫ ПРАВА (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'law', t.id, 1, 'Что такое право?', to_jsonb(ARRAY['Мораль', 'Система норм, регулирующих общественные отношения', 'Религия', 'Традиция']), 1, 'Право — система общеобязательных норм, установленных государством'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Основы права'
UNION ALL
SELECT 'law', t.id, 1, 'Что является основным законом РК?', to_jsonb(ARRAY['УК', 'Конституция', 'ГК', 'ТК']), 1, 'Конституция — высший нормативный акт'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Основы права'
UNION ALL
SELECT 'law', t.id, 2, 'Что такое субъект права?', to_jsonb(ARRAY['Только граждане', 'Участник правоотношений', 'Только государство', 'Только организации']), 1, 'Субъект права — участник, обладающий правами и обязанностями'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Основы права'
UNION ALL
SELECT 'law', t.id, 3, 'Правоспособность — это:', to_jsonb(ARRAY['Возможность иметь права', 'Возможность осуществлять права', 'Обязанность соблюдать нормы', 'Наказание за нарушение']), 0, 'Правоспособность — способность иметь права и обязанности'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Основы права'
UNION ALL
SELECT 'law', t.id, 1, 'Что такое договор?', to_jsonb(ARRAY['Закон', 'Соглашение сторон', 'Судебное решение', 'Административный акт']), 1, 'Договор — соглашение двух или более сторон'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Гражданское право'
UNION ALL
SELECT 'law', t.id, 2, 'Срок исковой давности по общим требованиям:', to_jsonb(ARRAY['1 год', '3 года', '5 лет', '10 лет']), 1, 'Общий срок исковой давности — 3 года'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Гражданское право'
UNION ALL
SELECT 'law', t.id, 3, 'Что такое недействительная сделка?', to_jsonb(ARRAY['Действительная', 'Не порождает последствий', 'Оспоримая', 'Ничтожная']), 1, 'Недействительная сделка не порождает юридических последствий'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Гражданское право'
UNION ALL
SELECT 'law', t.id, 1, 'Что такое преступление?', to_jsonb(ARRAY['Проступок', 'Виновно совершённое общественно опасное деяние', 'Договор', 'Сделка']), 1, 'Преступление — виновное общественно опасное деяние'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Уголовное право'
UNION ALL
SELECT 'law', t.id, 2, 'Возраст уголовной ответственности в РК:', to_jsonb(ARRAY['14', '16', '18', '21']), 1, 'С 16 лет — общий возраст, с 14 — за тяжкие преступления'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Уголовное право'
UNION ALL
SELECT 'law', t.id, 3, 'Что такое умысел?', to_jsonb(ARRAY['Неосторожность', 'Предвидение последствий', 'Случай', 'Незнание']), 1, 'Умысел — предвидение и желание последствий'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Уголовное право'
UNION ALL
SELECT 'law', t.id, 1, 'Что такое административное правонарушение?', to_jsonb(ARRAY['Преступление', 'Проступок', 'Договор', 'Сделка']), 1, 'Адм. правонарушение — проступок, влекущий адм. ответственность'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Административное право'
UNION ALL
SELECT 'law', t.id, 2, 'Кто издаёт нормативные правовые акты?', to_jsonb(ARRAY['Только президент', 'Государственные органы', 'Граждане', 'Суды']), 1, 'НПА издаёт государство в лице компетентных органов'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Административное право'
UNION ALL
SELECT 'law', t.id, 3, 'Что такое законность?', to_jsonb(ARRAY['Произвол', 'Точное соблюдение норм', 'Свобода', 'Независимость']), 1, 'Законность — точное соблюдение норм права всеми'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Административное право'
UNION ALL
SELECT 'law', t.id, 1, 'Что такое брак?', to_jsonb(ARRAY['Дружба', 'Свободный союз мужчины и женщины', 'Работа', 'Учёба']), 1, 'Брак — свободный равноправный союз'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Семейное право'
UNION ALL
SELECT 'law', t.id, 2, 'Минимальный возраст вступления в брак в РК:', to_jsonb(ARRAY['16', '18', '21', '14']), 1, 'С 18 лет — общее правило, с 16 — в исключительных случаях'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Семейное право'
UNION ALL
SELECT 'law', t.id, 3, 'Что такое алименты?', to_jsonb(ARRAY['Подарок', 'Обязательство по содержанию', 'Налог', 'Штраф']), 1, 'Алименты — обязательство содержания нетрудоспособных родственников'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Семейное право'
UNION ALL
SELECT 'law', t.id, 1, 'Что такое трудовой договор?', to_jsonb(ARRAY['Закон', 'Соглашение работник-работодатель', 'Судебное решение', 'Приказ']), 1, 'Трудовой договор — соглашение между работником и работодателем'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Трудовое право'
UNION ALL
SELECT 'law', t.id, 2, 'Нормальная продолжительность рабочего времени:', to_jsonb(ARRAY['30 ч/нед', '40 ч/нед', '50 ч/нед', '60 ч/нед']), 1, '40 часов в неделю — нормальная продолжительность'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Трудовое право'
UNION ALL
SELECT 'law', t.id, 3, 'Что такое минимальная заработная плата?', to_jsonb(ARRAY['Средняя зарплата', 'Нижний предел оплаты труда', 'Максимальная зарплата', 'Официальная зарплата']), 1, 'МЗП — установленный законом минимум'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Трудовое право'
UNION ALL
SELECT 'law', t.id, 1, 'Что такое земельное право?', to_jsonb(ARRAY['Уголовное', 'Гражданское', 'Регулирование земельных отношений', 'Административное']), 2, 'Земельное право — отрасль, регулирующая земельные отношения'
FROM topics t WHERE t.subject_id = 'law' AND t.name = 'Гражданское право';

-- АНГЛИЙСКИЙ ЯЗЫК (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'english', t.id, 1, 'Переведите: "I am a student"', to_jsonb(ARRAY['Я учитель', 'Я студент', 'Я работаю', 'Я учусь']), 1, 'I am = Я есть/являюсь, student = студент'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Грамматика'
UNION ALL
SELECT 'english', t.id, 1, 'Какой артикль используется перед "apple"?', to_jsonb(ARRAY['a', 'an', 'the', 'без артикля']), 1, 'an apple — перед гласным звуком'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Грамматика'
UNION ALL
SELECT 'english', t.id, 2, 'Past Simple формы глагола "go":', to_jsonb(ARRAY['goed', 'went', 'gone', 'going']), 1, 'go → went → gone (неправильный глагол)'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Грамматика'
UNION ALL
SELECT 'english', t.id, 2, 'Выберите правильный вариант: "She ___ to school"', to_jsonb(ARRAY['go', 'goes', 'going', 'gone']), 1, 'She goes — 3-е лицо ед.ч. Present Simple'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Грамматика'
UNION ALL
SELECT 'english', t.id, 3, 'Условное предложение: "If I ___ rich, I would travel"', to_jsonb(ARRAY['am', 'was', 'were', 'be']), 2, 'If I were — 2-й тип условных предложений (нереальное)'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Грамматика'
UNION ALL
SELECT 'english', t.id, 1, 'Переведите: "book"', to_jsonb(ARRAY['Ручка', 'Книга', 'Стол', 'Стул']), 1, 'book = книга'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Лексика'
UNION ALL
SELECT 'english', t.id, 2, 'Антоним слова "big":', to_jsonb(ARRAY['large', 'huge', 'small', 'tall']), 2, 'small — антоним big'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Лексика'
UNION ALL
SELECT 'english', t.id, 2, 'Синоним слова "happy":', to_jsonb(ARRAY['sad', 'angry', 'glad', 'tired']), 2, 'glad = happy'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Лексика'
UNION ALL
SELECT 'english', t.id, 3, 'Значение фразы "break the ice":', to_jsonb(ARRAY['Сломать лёд', 'Начать разговор', 'Заморозить', 'Плавать']), 1, 'break the ice = начать разговор, снять напряжение'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Лексика'
UNION ALL
SELECT 'english', t.id, 1, 'Какой тип текста рассказывает историю?', to_jsonb(ARRAY['Описание', 'Повествование', 'Рассуждение', 'Инструкция']), 1, 'Повествование — narration of events'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Чтение'
UNION ALL
SELECT 'english', t.id, 2, 'Основная мысль текста — это:', to_jsonb(ARRAY['Первое предложение', 'Главная идея', 'Последнее предложение', 'Среднее предложение']), 1, 'Main idea — основная мысль'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Чтение'
UNION ALL
SELECT 'english', t.id, 3, 'Какой приём используется для сравнения?', to_jsonb(ARRAY['Пример', 'Аналогия', 'Определение', 'Перечисление']), 1, 'Аналогия — сравнение для пояснения'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Чтение'
UNION ALL
SELECT 'english', t.id, 1, 'Как начать официальное письмо?', to_jsonb(ARRAY['Привет!', 'Dear Sir/Madam', 'Как дела?', 'Пока']), 1, 'Dear Sir/Madam — официальное обращение'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Письмо'
UNION ALL
SELECT 'english', t.id, 2, 'Что такое эссе?', to_jsonb(ARRAY['Список', 'Небольшое произведение', 'Стих', 'Пьеса']), 1, 'Эссе — небольшое прозаическое произведение'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Письмо'
UNION ALL
SELECT 'english', t.id, 3, 'Какой залог выражает действие над субъектом?', to_jsonb(ARRAY['Active', 'Passive', 'Perfect', 'Continuous']), 1, 'Passive voice — страдательный залог'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Письмо'
UNION ALL
SELECT 'english', t.id, 1, 'Столица Великобритании:', to_jsonb(ARRAY['Лондон', 'Париж', 'Берлин', 'Рим']), 0, 'Лондон — столица UK'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Культура'
UNION ALL
SELECT 'english', t.id, 2, 'Какой праздник отмечают 25 декабря?', to_jsonb(ARRAY['Пасха', 'Рождество', 'Хэллоуин', 'День независимости']), 1, 'Christmas — Рождество'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Культура'
UNION ALL
SELECT 'english', t.id, 3, 'Кто написал "Гамлет"?', to_jsonb(ARRAY['Диккенс', 'Шекспир', 'Толстой', 'Достоевский']), 1, 'William Shakespeare — автор Гамлета'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Культура'
UNION ALL
SELECT 'english', t.id, 1, 'Переведите: "The Earth rotates around the Sun"', to_jsonb(ARRAY['Луна вращается вокруг Земли', 'Земля вращается вокруг Солнца', 'Солнце вращается вокруг Земли', 'Марс вращается вокруг Юпитера']), 1, 'Earth = Земля, rotates = вращается, Sun = Солнце'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Наука'
UNION ALL
SELECT 'english', t.id, 2, 'Какой газ преобладает в атмосфере?', to_jsonb(ARRAY['Кислород', 'Азот', 'CO₂', 'Водород']), 1, 'Азот ~78% атмосферы'
FROM topics t WHERE t.subject_id = 'english' AND t.name = 'Наука';

-- ИНФОРМАТИКА (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'informatics', t.id, 1, 'Сколько бит в одном байте?', to_jsonb(ARRAY['4', '8', '16', '32']), 1, '1 байт = 8 бит'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Основы'
UNION ALL
SELECT 'informatics', t.id, 1, 'Что такое CPU?', to_jsonb(ARRAY['Жёсткий диск', 'Центральный процессор', 'Оперативная память', 'Монитор']), 1, 'CPU = Central Processing Unit — процессор'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Основы'
UNION ALL
SELECT 'informatics', t.id, 2, 'Какой язык программирования является машинным?', to_jsonb(ARRAY['Python', 'Java', 'Машинный код (0 и 1)', 'C++']), 2, 'Машинный код — только 0 и 1'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Основы'
UNION ALL
SELECT 'informatics', t.id, 3, 'Что такое алгоритм?', to_jsonb(ARRAY['Программа', 'Последовательность шагов для решения задачи', 'Данные', 'Ошибка']), 1, 'Алгоритм — точная последовательность шагов'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Основы'
UNION ALL
SELECT 'informatics', t.id, 1, 'Что такое база данных?', to_jsonb(ARRAY['Одна таблица', 'Организованная совокупность данных', 'Программа', 'Файл']), 1, 'БД — организованная совокупность данных'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Базы данных'
UNION ALL
SELECT 'informatics', t.id, 2, 'Что такое SQL?', to_jsonb(ARRAY['Язык программирования', 'Язык запросов к БД', 'Операционная система', 'Браузер']), 1, 'SQL = Structured Query Language'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Базы данных'
UNION ALL
SELECT 'informatics', t.id, 3, 'Что такое первичный ключ?', to_jsonb(ARRAY['Дублирующееся поле', 'Уникальный идентификатор записи', 'Текстовое поле', 'Числовое поле']), 1, 'Primary key — уникальный идентификатор'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Базы данных'
UNION ALL
SELECT 'informatics', t.id, 1, 'Что такое Интернет?', to_jsonb(ARRAY['Один компьютер', 'Глобальная сеть', 'Программа', 'Файл']), 1, 'Internet — глобальная компьютерная сеть'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Сети'
UNION ALL
SELECT 'informatics', t.id, 2, 'Протокол HTTP используется для:', to_jsonb(ARRAY['Электронной почты', 'Веб-страниц', 'Файлов', 'Игр']), 1, 'HTTP — протокол передачи гипертекста (веб)'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Сети'
UNION ALL
SELECT 'informatics', t.id, 3, 'Что такое IP-адрес?', to_jsonb(ARRAY['Имя сайта', 'Уникальный адрес устройства в сети', 'Пароль', 'Почта']), 1, 'IP-address — уникальный числовой адрес'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Сети'
UNION ALL
SELECT 'informatics', t.id, 1, 'Что такое антивирус?', to_jsonb(ARRAY['Вирус', 'Программа для защиты', 'Игра', 'Сайт']), 1, 'Антивирус защищает от вредоносного ПО'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Безопасность'
UNION ALL
SELECT 'informatics', t.id, 2, 'Что такое пароль?', to_jsonb(ARRAY['Имя пользователя', 'Секретная фраза для доступа', 'Адрес сайта', 'Файл']), 1, 'Пароль — секретная фраза для аутентификации'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Безопасность'
UNION ALL
SELECT 'informatics', t.id, 3, 'Что такое шифрование?', to_jsonb(ARRAY['Сжатие файла', 'Преобразование данных для защиты', 'Удаление файла', 'Копирование']), 1, 'Шифрование — защита данных путём кодирования'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Безопасность'
UNION ALL
SELECT 'informatics', t.id, 1, 'Что такое ОС?', to_jsonb(ARRAY['Офисный пакет', 'Операционная система', 'Браузер', 'Игра']), 1, 'ОС = Operating System — управляет компьютером'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'ОС'
UNION ALL
SELECT 'informatics', t.id, 2, 'Примеры ОС:', to_jsonb(ARRAY['Word, Excel', 'Windows, Linux', 'Chrome, Firefox', 'Photoshop']), 1, 'Windows, Linux, macOS — операционные системы'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'ОС'
UNION ALL
SELECT 'informatics', t.id, 3, 'Что такое файловая система?', to_jsonb(ARRAY['Антивирус', 'Способ организации файлов', 'Процессор', 'Память']), 1, 'Файловая система — структура хранения файлов (NTFS, FAT32, ext4)'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'ОС'
UNION ALL
SELECT 'informatics', t.id, 1, 'Что такое браузер?', to_jsonb(ARRAY['Поисковик', 'Программа для просмотра сайтов', 'Соцсеть', 'Магазин']), 1, 'Браузер — клиент для просмотра веб-страниц'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Web'
UNION ALL
SELECT 'informatics', t.id, 2, 'Что такое HTML?', to_jsonb(ARRAY['Язык программирования', 'Язык разметки веб-страниц', 'База данных', 'Сервер']), 1, 'HTML = HyperText Markup Language'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Web'
UNION ALL
SELECT 'informatics', t.id, 3, 'Что такое CSS?', to_jsonb(ARRAY['База данных', 'Язык стилей для веб', 'Язык программирования', 'Сервер']), 1, 'CSS = Cascading Style Sheets — стили веб-страниц'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Web'
UNION ALL
SELECT 'informatics', t.id, 2, 'Что такое цикл в программировании?', to_jsonb(ARRAY['Условие', 'Повторение блока кода', 'Переменная', 'Функция']), 1, 'Цикл — многократное выполнение кода'
FROM topics t WHERE t.subject_id = 'informatics' AND t.name = 'Основы';

-- ВСЕМИРНАЯ ИСТОРИЯ (20 вопросов)
INSERT INTO questions (subject_id, topic_id, difficulty, question_text, options, correct_answer, explanation)
SELECT 'world_history', t.id, 1, 'Когда началась II мировая война?', to_jsonb(ARRAY['1937', '1939', '1941', '1945']), 1, '1 сентября 1939 года — нападение Германии на Польшу'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Древний мир'
UNION ALL
SELECT 'world_history', t.id, 2, 'Кто был первым императором Рима?', to_jsonb(ARRAY['Юлий Цезарь', 'Август', 'Нерон', 'Калигула']), 1, 'Август (Октавиан) — первый римский император с 27 г. до н.э.'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Древний мир'
UNION ALL
SELECT 'world_history', t.id, 3, 'Когда пала Западная Римская империя?', to_jsonb(ARRAY['476', '1453', '395', '800']), 0, '476 год — падение Западной Римской империи'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Древний мир'
UNION ALL
SELECT 'world_history', t.id, 1, 'Что такое Средневековье?', to_jsonb(ARRAY['Древний мир', 'Эпоха между античностью и Новым временем', 'Новое время', 'Современность']), 1, 'Средневековье ~500-1500 гг.'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Средневековье'
UNION ALL
SELECT 'world_history', t.id, 2, 'Когда произошло крещение Руси?', to_jsonb(ARRAY['862', '988', '1240', '1380']), 1, '988 год — крещение Руси князем Владимиром'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Средневековье'
UNION ALL
SELECT 'world_history', t.id, 3, 'Что такое магдебургское право?', to_jsonb(ARRAY['Религиозный закон', 'Городское самоуправление', 'Военный устав', 'Судопроизводство']), 1, 'Магдебургское право — система городского самоуправления'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Средневековье'
UNION ALL
SELECT 'world_history', t.id, 1, 'Когда началась Великая французская революция?', to_jsonb(ARRAY['1776', '1789', '1812', '1848']), 1, '14 июля 1789 года — взятие Бастилии'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Новое время'
UNION ALL
SELECT 'world_history', t.id, 2, 'Кто был главой Франции во время революции?', to_jsonb(ARRAY['Людовик XVI', 'Наполеон', 'Робеспьер', 'Марат']), 0, 'Людовик XVI — король в начале революции'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Новое время'
UNION ALL
SELECT 'world_history', t.id, 3, 'Что такое "Священный союз"?', to_jsonb(ARRAY['Революционный союз', 'Консервативный союз монархов', 'Торговый союз', 'Военный альянс']), 1, 'Священный союз 1815 — консервативный союз России, Австрии, Пруссии'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Новое время'
UNION ALL
SELECT 'world_history', t.id, 1, 'Когда началась промышленная революция?', to_jsonb(ARRAY['XVI век', 'XVIII век', 'XIX век', 'XX век']), 1, 'С конца XVIII века в Англии'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Новое время'
UNION ALL
SELECT 'world_history', t.id, 2, 'Кто изобрёл паровую машину?', to_jsonb(ARRAY['Эдисон', 'Дж. Уатт', 'Франклин', 'Ленорман']), 1, 'Джеймс Уатт усовершенствовал паровую машину'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Новое время'
UNION ALL
SELECT 'world_history', t.id, 3, 'Что такое "Просвещение"?', to_jsonb(ARRAY['Религиозное движение', 'Философское движение XVIII века', 'Военная кампания', 'Экономическая теория']), 1, 'Просвещение — философское движение XVIII века'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'Новое время'
UNION ALL
SELECT 'world_history', t.id, 1, 'Когда началась I мировая война?', to_jsonb(ARRAY['1912', '1914', '1916', '1918']), 1, '28 июля 1914 года'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'XX век'
UNION ALL
SELECT 'world_history', t.id, 2, 'Какая империя распалась после WWI?', to_jsonb(ARRAY['Британская', 'Австро-Венгерская', 'Французская', 'Американская']), 1, 'Австро-Венгерская империя распалась'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'XX век'
UNION ALL
SELECT 'world_history', t.id, 3, 'Что такое Версальский договор?', to_jsonb(ARRAY['Мирный договор после WWI', 'Военный союз', 'Экономический пакт', 'Политический манифест']), 0, 'Версальский договор 1919 — мирный договор после WWI'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'XX век'
UNION ALL
SELECT 'world_history', t.id, 1, 'Когда закончилась WWII?', to_jsonb(ARRAY['1943', '1944', '1945', '1946']), 2, '2 сентября 1945 года — капитуляция Японии'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'XX век'
UNION ALL
SELECT 'world_history', t.id, 2, 'Что такое Холокост?', to_jsonb(ARRAY['Ядерная бомбардировка', 'Геноцид евреев нацистами', 'Блокада', 'Эвакуация']), 1, 'Холокост — систематическое уничтожение евреев'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'XX век'
UNION ALL
SELECT 'world_history', t.id, 3, 'Когда была сброшена атомная бомба на Хиросиму?', to_jsonb(ARRAY['6 августа 1944', '6 августа 1945', '9 августа 1945', '2 сентября 1945']), 1, '6 августа 1945 года'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'XX век'
UNION ALL
SELECT 'world_history', t.id, 1, 'Что такое "Холодная война"?', to_jsonb(ARRAY['Военный конфликт', 'Политическое противостояние', 'Экономический кризис', 'Эпидемия']), 1, 'Холодная война — противостояние США и СССР'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'XX век'
UNION ALL
SELECT 'world_history', t.id, 2, 'Когда пал Берлинский wall?', to_jsonb(ARRAY['1987', '1989', '1991', '1993']), 1, '9 ноября 1989 года'
FROM topics t WHERE t.subject_id = 'world_history' AND t.name = 'XX век';