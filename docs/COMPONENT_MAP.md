# Карта компонентов

## Универсальные

| Компонент | Файл | Назначение |
|---|---|---|
| Container | `src/components/ui/Container.ts` | Ширина до 1280 px и адаптивные поля |
| SectionHeading | `src/components/ui/SectionHeading.ts` | Заголовки структурных страниц |
| Button | `src/components/ui/Button.ts` | Primary, secondary, quiet и inverse actions |
| TextLink | `src/components/ui/TextLink.ts` | Вторичное действие с touch target 44 px |
| Header | `src/components/layout/Header.ts` | Белый global header, desktop-nav, red CTA |
| MobileMenu | `src/components/layout/MobileMenu.ts` | Drawer, `aria-expanded`, Escape и focus trap |
| FAQ | `src/components/sections/FAQ.ts` | Нативные `details/summary`; default и home-editorial variants |
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
| HomeFinalCTA | Отдельная финальная конверсионная композиция |

Все перечисленные файлы находятся в `src/components/home/`. Контент передается из `src/data/home.ts`; внутри компонентов copy не смешивается с layout, кроме служебных accessibility-подписей.

## Существующие структурные компоненты

`Hero`, `RecognitionList`, `CasePreview`, `ExpertPreview`, `LeadForm` и другие компоненты из `src/components/sections/` сохранены для `/formula-tela/`; новая главная их не переиспользует, чтобы визуальный редизайн не распространился на услугу.

## Тест

| Компонент | Назначение |
|---|---|
| ProgressBar | Нативный progress и текущий шаг |
| QuizQuestion | Один вопрос, fieldset, back/next |
| QuizOption | Нативный radio option с keyboard support |
| QuizResult | Недиагностический mock-result и CTA |

`PageShell` — технический компоновщик landmarks; `QuizController` — application layer, а не визуальный компонент.
