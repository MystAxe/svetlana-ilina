# План файлов

```text
prototype/
├── index.html
├── formula-tela/index.html
├── test/index.html
├── public/images/placeholders/
│   ├── portrait-editorial.svg
│   └── landscape-editorial.svg
├── src/
│   ├── entries/                     # Инициализация трех маршрутов
│   ├── pages/
│   │   ├── homePage.ts              # Новая композиция главной
│   │   ├── formulaPage.ts           # Структурный прототип услуги
│   │   └── quizPage.ts              # Shell теста
│   ├── components/
│   │   ├── home/                    # 11 editorial-секций главной
│   │   ├── ui/                      # Container, heading, actions
│   │   ├── layout/                  # Header, mobile menu, shell, footer
│   │   ├── sections/                # Общие и legacy-секции услуги
│   │   └── quiz/                    # Презентационные элементы теста
│   ├── data/                        # Контент, verification statuses, mock-data
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

WordPress-файлы, ACF и REST endpoint на этой итерации не создаются.
