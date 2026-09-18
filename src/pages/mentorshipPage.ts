import { PageShell } from '../components/layout/PageShell';
import { FAQ } from '../components/sections/FAQ';
import { StoryCard } from '../components/stories/StoryCard';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { transformationStories } from '../data/stories';
import { escapeHtml } from '../lib/dom';
import { SignatureArt, SignatureDivider } from '../components/decorations/SignatureLine';

const action = { label: 'Хочу обсудить свою цель', href: '#application' };
const audience = ['Хотите снизить вес и больше не начинать очередную диету.', 'Вес уходит, а затем возвращается.', 'Знаете основы питания, но тело не меняется так, как хочется.', 'Вечером переедаете или часто хочется сладкого.', 'Тренируетесь, но не видите ожидаемых изменений.', 'Хотите более подтянутое тело, даже если вес уже нормальный.', 'Не хватает энергии и восстановления.', 'Система держится неделю-две, а затем распадается.'];
const months = [
  ['1 месяц', 'Настраиваем', 'Определяем точку А и цель, проводим «Формулу тела», выстраиваем питание и активность под вашу жизнь.'],
  ['2 месяц', 'Корректируем', 'Смотрим реальную динамику: насыщение, энергию, сон, нагрузку, вес и объёмы, если это соответствует вашей цели.'],
  ['3 месяц', 'Закрепляем', 'Оставляем работающие решения и учимся применять их после поездок, праздников и сложных недель.'],
];
const includes = [
  ['Старт', '«Формула тела» и личная цель'],
  ['12 созвонов', 'Еженедельные встречи по 30–40 минут'],
  ['Между встречами', 'Связь в удобном мессенджере по текущим рекомендациям'],
  ['Питание', 'Меню, конструктор или корректировка привычного рациона по необходимости'],
  ['Динамика', 'Отслеживание показателей, которые относятся к вашей цели'],
  ['Активность', 'Подходящая нагрузка и корректировки по мере прогресса'],
];
const faq = [
  { question: 'Можно ли работать полностью онлайн?', answer: 'Да. Наставничество может полностью проходить онлайн.' },
  { question: 'Нужно ли ходить в зал?', answer: 'Нет. Необходимая нагрузка определяется индивидуально.' },
  { question: 'Входят ли персональные тренировки?', answer: 'Тренировки 1:1 подключаются и оплачиваются отдельно. Библиотека домашних занятий входит как бонус.' },
  { question: 'Нужно ли заранее сдавать анализы?', answer: 'Нет. Сначала я оцениваю ситуацию и имеющиеся данные. Если дополнительная информация нужна, мы определяем это персонально.' },
  { question: 'Если я уже прошла «Формулу тела»?', answer: 'Повторная диагностика не требуется. Уплаченные 4 900 ₽ засчитываются в стоимость наставничества.' },
  { question: 'Можно ли купить только один месяц?', answer: 'Наставничество — единый маршрут на 3 месяца. Три платежа по 32 000 ₽ — способ разделить оплату этого маршрута.' },
  { question: 'Что будет после трёх месяцев?', answer: 'Мы подведём итог и определим дальнейший маршрут. Если сопровождение больше не нужно, вы продолжаете самостоятельно.' },
];
function section(id: string, eyebrow: string, title: string, body: string, soft = false): string {
  return `<section class='content-section ${soft ? 'content-section--soft' : ''}' id='${id}' aria-labelledby='${id}-title'>${Container({ content: `<p class='home-kicker'>${escapeHtml(eyebrow)}</p><h2 class='home-title' id='${id}-title'>${escapeHtml(title)}</h2>${body}` })}</section>`;
}
function cards(items: string[][]): string {
  return `<div class='product-detail-grid'>${items.map(([eyebrow, title, text]) => `<article class='product-detail-card'><span class='product-detail-card__number'>${escapeHtml(eyebrow)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>`;
}
function application(): string {
  return `<section class='content-section content-section--soft' id='application' aria-labelledby='application-title'>${Container({ content: `<div class='product-form-intro'><p class='home-kicker'>Заявка</p><h2 class='home-title' id='application-title'>Хочу на персональное наставничество</h2><p>Светлана лично посмотрит ваш запрос и свяжется с вами в удобном мессенджере.</p></div><form class='product-application' data-lead-form>
    <div class='product-form-grid'><label>Имя <input name='name' autocomplete='name' required></label><label>Возраст <input name='age' type='number' min='18' max='120' inputmode='numeric' required></label></div>
    <label>Что сейчас хотите изменить? <textarea name='current-goal' rows='3'></textarea></label>
    <label>Какой результат хотите получить за ближайшие 3 месяца? <textarea name='three-month-goal' rows='3'></textarea></label>
    <label>Что уже пробовали? <textarea name='previous-attempts' rows='3'></textarea></label>
    <div class='product-form-grid'><label>Удобный мессенджер <select name='messenger'><option value=''>Выберите</option><option>Telegram</option><option>MAX</option><option>WhatsApp</option><option>Другой</option></select></label><label>Контакт <input name='contact' autocomplete='tel' required></label></div>
    <label class='product-consent'><input name='consent' type='checkbox' required><span>Согласна с <a href='/personal-data-consent/'>обработкой персональных данных</a> и ознакомилась с <a href='/privacy-policy/'>политикой конфиденциальности</a>.</span></label>
    ${Button({ label: 'Отправить заявку', type: 'submit' })}<p class='product-form-status' role='status' tabindex='-1' data-lead-status>Прототип: заявка пока не отправляется.</p>
  </form>` })}</section>`;
}
export function mentorshipPage(): string {
  const hero = `<section class='product-hero' aria-labelledby='mentor-title'>${Container({ content: `<div class='product-hero__layout'><div class='product-hero__content'><p class='home-kicker'>Персональное наставничество</p><h1 id='mentor-title'>План подстраивается под вас. Не вы под план.</h1><p class='product-hero__lead'>За 3 месяца мы выстроим персональную систему питания, нагрузки и восстановления под вашу цель — и будем менять её по реакции именно вашего тела.</p><p>Я лично веду вас весь путь и каждую неделю корректирую дальнейшие действия по вашей динамике.</p><div class='product-hero__price'><strong>90 000 ₽</strong><span>за 3 месяца при полной оплате<br>или 3 × 32 000 ₽</span></div><div class='product-hero__actions'>${Button(action)}${Button({ label: 'Сначала «Формула тела»', href: '/formula-tela/', variant: 'secondary' })}</div><small>Количество мест ограничено, потому что каждого клиента я веду лично.</small></div>${SignatureArt('journey')}</div>` })}</section>`;
  const difference = section('difference', 'Главное отличие', 'План подстраивается под вас', `<div class='product-prose'><p>Вес, аппетит, энергия, график и сон меняются. То, что работает на бумаге, иногда неудобно в обычной жизни. Каждую неделю мы смотрим: что работает → что мешает → что оставляем → что меняем → что делаем дальше.</p><blockquote>Вам не нужно идеально выполнять мой план. Моя задача — сделать так, чтобы он работал в вашей реальной жизни.</blockquote></div>`);
  const recognition = section('for-whom', 'Кому подходит', 'Возможно, вы узнаёте себя', `<div class='product-checklist'>${audience.map(item => `<p>${escapeHtml(item)}</p>`).join('')}</div><p class='product-section-note'>Вам не нужно заранее знать причину. С этого и начинается наша работа.</p>${Button(action)}`, true);
  const timeline = section('timeline', 'Почему 3 месяца', 'Настроить, скорректировать, закрепить', `<p class='product-section-note'>Недостаточно составить план. Нужно увидеть реакцию тела, изменить действия и закрепить работающую систему.</p>${cards(months)}`);
  const scope = section('includes', 'Что входит', 'Всё необходимое для личного ведения', cards(includes.map(([a, b]) => [a, b, 'Решение подбирается и меняется по вашей динамике.'])), true);
  const training = section('training', 'Бонус', 'Библиотека домашних тренировок', `<div class='product-prose'><p>Готовые занятия со мной — от коротких лёгких тренировок примерно по 10 минут до более полноценной нагрузки. Я подскажу, какие занятия использовать по вашей цели и состоянию. Доступ входит в наставничество.</p><p>Персональные тренировки 1:1 оплачиваются отдельно.</p></div>`);
  const support = section('support', 'Сопровождение', 'У вас есть следующий конкретный шаг', `<div class='product-prose'><p>Если меняется график, вес остановился или после тренировок стало меньше энергии, мы разбираем ситуацию и корректируем действия. Ценность наставничества — в личном ведении на протяжении трёх месяцев.</p></div>${Button(action)}`, true);
  const next = section('formula', 'Два формата', '«Формула тела» даёт маршрут. Наставничество помогает его пройти', `<p class='product-section-note'>На диагностике определяем точку А и первые действия. В наставничестве я остаюсь рядом на следующие три месяца и меняю план по вашей динамике.</p>${Button({ label: 'Начать с «Формулы тела»', href: '/formula-tela/', variant: 'secondary' })}`);
  const goal = section('goal', 'К какой точке идём', 'Понимать своё тело и свою систему', `<div class='product-checklist'><p>«Я знаю, как мне нужно питаться».</p><p>«Я вижу, что действительно работает для меня».</p><p>«Мне больше не нужно каждую неделю начинать сначала».</p></div><p class='product-section-note'>Конкретную цель определяем на старте. Результат индивидуален.</p>`, true);
  const stories = section('stories', 'Истории перемен', 'Разные точки старта', `<div class='story-card-grid'>${transformationStories.filter(story => ['/istorii-peremen/polina/', '/istorii-peremen/vika/', '/istorii-peremen/dasha/'].includes(story.href)).map(story => StoryCard(story, 'h3')).join('')}</div>${Button({ label: 'Все истории', href: '/istorii-peremen/', variant: 'secondary' })}`);
  const price = section('price', 'Стоимость', '3 месяца персональной работы', `<div class='product-price-panel'><div><strong>90 000 ₽</strong><span>при полной оплате · эквивалент 30 000 ₽ в месяц</span></div><div><strong>3 × 32 000 ₽</strong><span>если удобнее разделить оплату · всего 96 000 ₽</span></div>${Button({ label: 'Подать заявку', href: '#application' })}</div><p class='product-section-note'>Поэтапная оплата — способ оплатить единый трёхмесячный маршрут.</p>`, true);
  const credit = section('credit', 'Если уже была диагностика', 'Стоимость «Формулы тела» зачтём', `<p class='product-section-note'>Если после диагностики вы продолжаете работу в наставничестве, уплаченные 4 900 ₽ засчитываются в стоимость. Повторная диагностика не нужна.</p>${Button({ label: 'Начать с «Формулы тела»', href: '/formula-tela/', variant: 'secondary' })}`);
  const capacity = section('capacity', 'Личное участие', 'Я беру ограниченное количество клиентов', `<p class='product-section-note'>Я лично изучаю динамику каждого клиента, провожу еженедельные созвоны и остаюсь на связи между встречами.</p>${Button({ label: 'Узнать, есть ли место', href: '#application' })}`, true);
  const closing = section('closing', 'Следующий шаг', 'Обсудим вашу цель', `<p class='product-section-note'>Наставничество — 3 месяца · 90 000 ₽ при полной оплате или 3 × 32 000 ₽.</p>${Button(action)}`);
  return PageShell({ activePath: '/nastavnichestvo/', mainClassName: 'mentorship-page product-page', mainContent: [hero, SignatureDivider(), difference, recognition, timeline, SignatureDivider(), scope, training, support, next, goal, stories, price, credit, capacity, application(), FAQ({ items: faq, id: 'mentor-faq' }), closing].join('') });
}
