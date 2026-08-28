# План файлов

> Исторический план, не полный реестр нынешней сборки. Текущий состав и новые файлы описаны в [редизайне 28 августа 2026](REDESIGN_2026-08-28.md); реестр маршрутов находится в `scripts/site-entries.mjs`.

```text
prototype/
├── index.html
├── formula-tela/index.html
├── test/index.html
├── istorii-peremen/index.html
├── istorii-peremen/polina/index.html
├── nastavnichestvo/index.html
├── o-svetlane/index.html
├── blog/index.html
├── blog/{article-slug}/index.html
├── contacts/index.html
├── thank-you/index.html
├── privacy-policy/index.html
├── personal-data-consent/index.html
├── offer/index.html
├── requisites/index.html
├── public/images/placeholders/
│   ├── portrait-editorial.svg
│   └── landscape-editorial.svg
├── src/
│   ├── entries/                     # Инициализация специализированных и data-driven маршрутов
│   ├── pages/
│   │   ├── homePage.ts              # Новая композиция главной
│   │   ├── formulaPage.ts           # Структурный прототип услуги
│   │   ├── quizPage.ts              # Shell теста
│   │   └── staticPage.ts            # Обычные, legal, blog и article страницы
│   ├── components/
│   │   ├── home/                    # Editorial-секции главной
│   │   ├── stories/                 # Фильтры и медиа-состояния историй
│   │   ├── ui/                      # Container, heading, actions
│   │   ├── layout/                  # Header, mobile menu, shell, footer
│   │   ├── sections/                # Общие и legacy-секции услуги
│   │   └── quiz/                    # Презентационные элементы теста
│   ├── data/                        # Контент, verification statuses, mock-data, истории
│   ├── quiz/                        # State, scoring, validation, controller
│   ├── adapters/                    # Контракт отправки и no-op реализация
│   ├── lib/                         # DOM и accessibility helpers
│   └── styles/app.css               # Tailwind 4, fonts, tokens, global states
├── docs/
│   ├── COMPONENT_MAP.md
│   ├── OPEN_QUESTIONS.md
│   ├── QA.md
│   └── UX_NOTES.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Поток данных

```text
data/home.ts → homePage → components/home → semantic HTML

data/stories.ts → storiesArchivePage / polinaStoryPage
                 → components/stories + TransformationStoryFeature

data/staticPages.ts → staticPage → standard / legal / blog / article layouts

quiz data → reducer/scoring → controller → quiz UI
                                  ↓
                         submission adapter (no-op)
```

`home.ts` хранит не только copy, но и публичные статусы подтверждения. `editorialNotes` не выводятся посетителю; `publicLabel` и `publicDisclaimer` показываются в самом прототипе.

## После утверждения структуры

Только после UX-согласования компоненты можно переносить в будущую custom classic WordPress theme:

```text
components/ui       → template-parts/components
components/layout   → header.php / footer.php / template-parts
components/home     → template-parts/sections/home
components/sections → template-parts/sections
data/*.ts            → утвержденный WP content / фиксированные поля
quiz domain          → theme assets TypeScript
adapter interface    → будущий WordPress REST adapter
```

Внешний путь `app/public/wp-content`, на который ссылается сборочный адаптер, не входит в этот репозиторий. Перед WordPress-публикацией в отдельном административном слое нужно зарегистрировать CPT `case`, таксономию `case_problem`, публичные labels «Истории перемен» и rewrite `/istorii-peremen/`.

Будущий идемпотентный импорт должен создавать только отсутствующий контент:

- публикуемые структурные страницы;
- legal-страницы в статусе draft;
- три черновика нативных записей блога;
- черновики историй Полины, Светы, Вики и Оксаны и problem-термины;
- статическую главную и страницу записей, только если они ещё не назначены.

Существующие страницы, статусы, тексты и термины не должны перезаписываться. Кастомная тема, поля редактора, импорт и формы на этой итерации не создаются.
