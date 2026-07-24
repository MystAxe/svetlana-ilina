# QA visual-итерации главной

Дата проверки: 18 июля 2026.

## Автоматические проверки

- `npm.cmd run check` — TypeScript без ошибок.
- `npm.cmd run build` — production multi-page build успешен.
- Статический поиск в `src` и `public` — 0 запрещенных palette utilities, prototype-blue, gradients, glass, shadows, inline styles и `!important`.
- В quiz/adapters нет `fetch`, XHR, beacon, WebSocket, local/session storage или WordPress endpoint.
- Отдельный normalized diff подтвердил: reducer, scoring, validation, quiz data и adapters не изменены; визуальные изменения теста ограничены глобальным brand token и shell.

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
