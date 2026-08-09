# Карта компонентов

## Универсальные

| Компонент | Файл | Назначение |
|---|---|---|
| Container | `src/components/ui/Container.ts` | Ширина до 1280 px и адаптивные поля |
| SectionHeading | `src/components/ui/SectionHeading.ts` | Заголовки структурных страниц |
| Button | `src/components/ui/Button.ts` | Primary, secondary, quiet и inverse actions |
| TextLink | `src/components/ui/TextLink.ts` | Вторичное действие с touch target 44 px |
| Header | `src/components/layout/Header.ts` | Белый global header, desktop-nav, red CTA |
| MobileMenu | `src/components/layout/MobileMenu.ts` | Плавный drawer, `aria-expanded`, inert-фон, Escape и focus trap |
| FAQ | `src/components/sections/FAQ.ts` | Нативные `details/summary`; плавное появление ответа, default и home-editorial variants |
| Footer | `src/components/layout/Footer.ts` | Асимметричный black footer, navigation, legal disclaimer |

## Главная

| Компонент | Роль в сценарии |
|---|---|
| HomeHero | Асимметричный оффер, primary/secondary CTA, портрет; экспортирует `EditorialPicture` |
| AudienceQuotes | Вертикальный editorial-список узнаваемых фраз |
| ProblemEditorial | Черная секция переосмысления и пять факторов |
| MethodEditorial | Асимметричная сетка четырех опор, четвертая опора красная |
| TestFeature | Полноширинный red CTA, время и preview одного вопроса |
| FormulaFeature | Editorial-превью разбора: фото, три шага, результаты, рабочая цена |
| CaseFeature | Демонстрационная история с явными labels и disclaimer |
| AboutEditorial | Портрет, история, цитата и факты со статусами подтверждения |
| MentorshipFeature | Black-секция: 8–10 недель, путь клиента, CTA без оплаты |
| BlogEditorial | Один ведущий материал и два компактных |
| TransformationStoryFeature | Превью истории Полины: проблема, поворотное решение, голос клиентки и подтверждаемые изменения |
| HomeFinalCTA | Отдельная финальная конверсионная композиция |

Все перечисленные файлы находятся в `src/components/home/`. Контент передается из `src/data/home.ts`; внутри компонентов copy не смешивается с layout, кроме служебных accessibility-подписей.

## Истории перемен

| Компонент | Назначение |
|---|---|
| StoryFilters | Фильтр архива по узнаваемой проблеме; `aria-pressed`, live-status и URL-параметр |
| StoryVideo | Доступный видеоблок с постером, нативными контролами и подписью к фрагменту |
| TransformationStoryHero | Единый hero всех историй с одинаковой сеткой 7/5 и портретным медиа |
| StoryJourney | Общая последовательность изменений |
| StoryExpertComment | Общий комментарий Светланы с вариантами фона |
| StoryRecognition | Общий блок «узнаёте себя» |
| StoryCTA | Единый финальный конверсионный блок |
| PendingStoryMedia | Честная заглушка для ещё не опубликованных фото и видео |
| TransformationStoryPage | Общая оболочка detail-страницы и PageShell |
| storiesArchivePage | H1, problem-first фильтр, список подходящих историй и следующий шаг |

Общие секции находятся в `src/components/stories/TransformationStoryLayout.ts`. Уникальные экраны Полины, Светы и Вики остаются в собственных page-файлах. Контент и будущая CPT-модель находятся в `src/data/stories.ts`; WordPress-слой не требуется для работы публичного frontend.

## Существующие структурные компоненты

`Hero`, `RecognitionList`, `StoryPreview`, `ExpertPreview`, `LeadForm` и другие компоненты из `src/components/sections/` сохранены для `/formula-tela/`; новая главная их не переиспользует, чтобы визуальный редизайн не распространился на услугу.

## Остальные страницы

`staticPage` выбирает данные по текущему pathname и использует четыре осмысленных представления:

- standard — наставничество, «О Светлане», контакты;
- blog index — список реальных маршрутов статей;
- article — читаемая статья с информационным disclaimer;
- legal — тёмный первый экран и явный статус неутверждённого документа;
- thank-you — самостоятельное состояние после будущей отправки формы.

Контент хранится в `src/data/staticPages.ts`; неизвестный pathname получает локальное 404-состояние, а не пустой экран.

## Тест

| Компонент | Назначение |
|---|---|
| ProgressBar | Нативный progress и текущий шаг |
| QuizQuestion | Один вопрос, fieldset, back/next |
| QuizOption | Нативный radio option с keyboard support |
| QuizResult | Недиагностический mock-result и CTA |

`PageShell` — технический компоновщик landmarks; `QuizController` — application layer, а не визуальный компонент. `src/lib/motion.ts` наблюдает независимые смысловые группы и запускает короткий stagger их непосредственных элементов; фон и геометрия секции при этом остаются стабильными. При reduced motion всё сразу переводится в конечное состояние.
