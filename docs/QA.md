# QA visual-итерации главной

Дата проверки: 18 июля 2026.

## Автоматические проверки

- `npm.cmd run check` — TypeScript без ошибок.
- `npm.cmd run build` — production multi-page build успешен.
- Статический поиск в `src` и `public` — 0 запрещенных palette utilities, prototype-blue, gradients, glass, shadows, inline styles и `!important`.
- В quiz/adapters нет `fetch`, XHR, beacon, WebSocket, local/session storage или WordPress endpoint.
- Reducer, scoring, validation, quiz data и adapters не изменены; motion-итерация затронула только представление экранов и отказ от автоматического переноса фокуса при первой загрузке теста.

## Browser QA главной

Проверена реальная Vite-страница на шести ширинах:

| Width | Horizontal overflow | Targets < 44 px | Header mode | H1 |
|---:|---|---:|---|---:|
| 320 | нет | 0 | mobile menu | 1 |
| 375 | нет | 0 | mobile menu | 1 |
| 768 | нет | 0 | mobile menu | 1 |
| 1024 | нет | 0 | mobile menu | 1 |
| 1280 | нет | 0 | desktop nav | 1 |
| 1440 | нет | 0 | desktop nav | 1 |

Дополнительно:

- Desktop Hero занимает 0.90 / 0.90 / 0.93 viewport height на 1024 / 1280 / 1440 px.
- Computed H1-size: 40 px на 320, 40.025 px на 375, 58.496 px на 768, 70.528 px на 1024, 82.56 px на 1280, 90.08 px на 1440.
- Browser загрузил `Source Serif 4` для H1/H2 и `Manrope Variable` для body и прикладных ролей; `document.fonts.status = loaded`.
- На странице 12 semantic content sections, один H1, header/main/footer landmarks.
- Mobile menu: `aria-expanded`, scroll lock, dialog, Escape, возврат фокуса. DOM tab order идет от close control через navigation к CTA; focus trap ограничен panel.
- FAQ: нативный `details/summary`, высота summary 80 px, red plus и open-rotation 45°.
- Console на всех проверенных маршрутах — без warning/error.

## Responsive images

На главной семь `<picture>` instances. Для каждого `<img>` заданы `alt`, `width`, `height`, `sizes`, `loading`, `fetchpriority` и fallback. Hero загружается eager/high, остальные — lazy/auto. AVIF/WebP `<source>` добавятся только при появлении реальных `srcset`, поэтому прототип не запрашивает несуществующие файлы.

## Smoke-check соседних маршрутов

`/formula-tela/` и `/test/` проверены на 375 и 1280 px:

- overflow отсутствует;
- один H1, header и footer присутствуют;
- mobile/desktop navigation переключается на том же breakpoint;
- computed brand surface — `rgb(193, 18, 31)`;
- browser console чиста.

## Исправления по результатам QA

- Устранен overflow на 1024 px у крупного «8–10 недель»: aside расширен до пяти grid columns.
- Короткие header/footer links получили минимальную ширину 44 px.
- Значимый текст на красных surfaces переведен в непрозрачный белый для AA-контраста.
- Номера 01–05 на black surface увеличены до 24 px при сохранении красного акцента.
- Уточнены responsive `sizes` для hero, feature images и двух типов blog articles.

## Motion-итерация

Дата автоматической проверки: 24 июля 2026.

- `npm.cmd run check` и `npm.cmd run build` проходят.
- Длительности унифицированы до 180/220/260 мс; `transition: all`, inline styles и `!important` не добавлены.
- Reveal наблюдает 41 независимую смысловую группу через один `IntersectionObserver`: секция и её фон остаются стабильными, а непосредственные элементы входят каскадом 0/40/80/120/150 мс.
- `prefers-reduced-motion` отключает smooth scroll, stagger, page/quiz animations и задержки.
- Mobile menu закрывается после exit-перехода, блокирует фон через `inert`, сохраняет Escape/focus trap и корректно обрабатывает same-page anchors.
- DOM/browser QA выполнен на 320, 768 и 1280 px: горизонтального overflow нет, скрытых motion-элементов в viewport после завершения каскада нет, все 118 элементов принадлежат группам, в консоли нет ошибок.

## «Истории перемен»

Дата автоматической проверки: 29 июля 2026.

- `npm.cmd run check` — TypeScript без ошибок.
- `npm.cmd run build` — успешна production-сборка пяти маршрутов, включая `/istorii-peremen/` и `/istorii-peremen/polina/`.
- MU-plugin регистрации CPT проверен PHP 8.2: синтаксических ошибок нет.
- В production-выводе присутствуют оба HTML-маршрута, Worker и hosting metadata.
- В публичном исходном тексте нет старого `/cases/`, слова «кейс» и неподтвержденной цифры `−13`.
- CTA не использует формулировку «Записаться на диагностику»; услуга названа экспертным разбором.
- Статический поиск не нашел gradients, glass/backdrop blur, тяжелых shadow utilities, `transition-all` и `!important`.
- Архив использует `button` с `aria-pressed`, touch target 52 px, live-status и синхронизацию выбранной проблемы с URL.
- На архиве и в истории Полины по одному H1; 12 экранов истории имеют последовательные H2 и связаны через `aria-labelledby`.
- Видео Полины отдаются в совместимом MP4, имеют постеры, подписи, нативные элементы управления и не запускаются автоматически.
- Для отсутствующих фото и видео используются неинтерактивные заглушки: ложных play-кнопок и неподтвержденной цифры результата нет.

Browser QA этой итерации не выполнялся: изменения проверены структурно и production-сборкой.

## Архивная проверка внешнего WordPress-прототипа

Дата автоматической проверки: 29 июля 2026.

Ниже сохранён исторический отчёт по внешнему каталогу `app/public/wp-content`, которого нет в текущем репозитории. Эти пункты не подтверждают готовность нынешней версии к редактированию из админки WordPress.

- `npm.cmd run check` и `npm.cmd run build` проходят.
- Production-сборка содержит 17 HTML-маршрутов: основной sitemap, историю Полины и три страницы статей.
- Все пути из header, footer, главных CTA и карточек блога имеют соответствующий HTML entry или якорь существующего маршрута.
- `svetlana-required-pages.php` и `svetlana-transformation-stories.php` проходят PHP 8.2 lint.
- WordPress bootstrap не удаляет пример-страницу и не перезаписывает существующие страницы, статусы или тексты.
- Legal-страницы и статьи создаются черновиками; публичные структурные страницы создаются опубликованными.
- Главная и страница записей назначаются автоматически только при пустых `page_on_front` и `page_for_posts`.
- История Полины создаётся черновиком; исходные problem-термины назначаются только при её первом создании.

WordPress runtime-smoke не выполнялся, потому что локальный веб-сервис WordPress не был запущен; PHP-синтаксис и условия идемпотентности проверены по коду.
