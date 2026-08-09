# Архитектура сайта

## Базовый принцип

Сайт — независимое multi-page приложение на Vite и TypeScript. PHP, база данных и WordPress не требуются для production-публикации.

Поток рендеринга:

```text
src/data → src/pages → src/components → src/entries → HTML/Vite → dist/client
```

- `src/data` хранит тексты, медиаописания и структурированные данные.
- `src/components` хранит повторно используемую разметку и интерактивность.
- `src/pages` собирает целые страницы из компонентов.
- `src/entries` монтирует страницу, меню, фильтры и motion.
- корневые `*/index.html` задают route entry, title и description.
- `scripts/site-entries.mjs` является единым реестром production-маршрутов.

## Истории перемен

Общий каркас находится в `src/components/stories/TransformationStoryLayout.ts` и отвечает за:

- одинаковый hero и пропорции медиа;
- оболочку detail-страницы;
- путь изменений;
- комментарий Светланы;
- блок узнавания себя;
- финальный CTA;
- честные заглушки отсутствующих медиа.

Файлы `polinaStoryPage.ts`, `svetaStoryPage.ts` и `vikaStoryPage.ts` содержат только уникальные экраны и передают данные в общие секции. Это позволяет сохранять индивидуальный сценарий истории, не дублируя базовую верстку.

## Сборочные контуры

- `npm run build` и `npm run build:static` создают самостоятельный сайт в `dist/client`.
- `npm run build:github-pages` учитывает подкаталог репозитория.
- `npm run build:sites` добавляет Worker-оболочку и metadata для Sites.
- `npm run build:wordpress` дополнительно копирует статическую сборку в локальную тему.

WordPress является адаптером, а не источником обязательной runtime-зависимости. CPT `case` и таксономия `case_problem` остаются подготовленным административным слоем, но публичный frontend сейчас собирается из TypeScript-данных.

## Контроль целостности

После статической сборки `scripts/verify-static-build.mjs` проверяет:

- наличие HTML для каждого зарегистрированного маршрута;
- отсутствие ссылок на исходники `/src/`;
- наличие подключенных JS и CSS;
- копирование всех файлов из `public/media` и `public/images`.

Добавление нового маршрута начинается с `scripts/site-entries.mjs`; этот же реестр используют Vite, проверка сборки и WordPress-адаптер.
