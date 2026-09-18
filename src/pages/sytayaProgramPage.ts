import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { escapeHtml } from '../lib/dom';
import { emitProductEvent } from '../lib/productAnalytics';
import { lessons, mealFields, type Field } from '../data/sytayaCourse';

declare global { interface Window { siSytaya?: { api: string; nonce: string; login: string }; } }
type Answers = Record<string, string | string[]>;
type Screen = { answers: Answers; complete: boolean };
type State = { screens: Record<string, Screen>; mealCount: number };
const keys = ['before','day1','day2','day3','day4','day5','day6','day7'];
let state: State | null = null;
let current = 'welcome';
let timer = 0;
let saving = false;
const root = () => document.querySelector<HTMLElement>('[data-sytaya-program]');
const record = (key: string): Screen => state?.screens[key] ?? { answers:{}, complete:false };
const count = () => keys.slice(1).filter(key => record(key).complete).length;
const unlocked = (key: string) => key === 'before' || record(keys[keys.indexOf(key)-1]).complete;
function field(f: Field, value: string | string[] | undefined): string {
  const id = `sy-${f.key}`, v = typeof value === 'string' ? value : '';
  const condition = f.condition ? ` data-condition='${escapeHtml(f.condition)}'` : '';
  if (f.kind === 'checks') return `<fieldset class='course-field' data-field='${f.key}'${condition}><legend>${escapeHtml(f.label)}</legend><div class='course-options'>${(f.options ?? []).map(option => `<label><input name='${f.key}' type='checkbox' value='${escapeHtml(option)}' ${Array.isArray(value) && value.includes(option) ? 'checked' : ''}><span>${escapeHtml(option)}</span></label>`).join('')}</div></fieldset>`;
  if (f.kind === 'range') return `<label class='course-field' for='${id}'${condition}><span>${escapeHtml(f.label)} <output data-range-for='${id}'>${escapeHtml(v || '5')}</output>/10</span><input id='${id}' name='${f.key}' type='range' min='0' max='10' value='${escapeHtml(v || '5')}'><small>0 — почти нет · 10 — очень сильно</small></label>`;
  if (f.kind === 'select') return `<label class='course-field' for='${id}'${condition}><span>${escapeHtml(f.label)}</span><select id='${id}' name='${f.key}' ${current === 'before' ? 'required' : ''}><option value=''>Выберите</option>${(f.options ?? []).map(option => `<option value='${escapeHtml(option)}' ${v === option ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}</select></label>`;
  if (f.kind === 'textarea') return `<label class='course-field' for='${id}'${condition}><span>${escapeHtml(f.label)}</span><textarea id='${id}' name='${f.key}' rows='3'>${escapeHtml(v)}</textarea></label>`;
  return `<label class='course-field' for='${id}'${condition}><span>${escapeHtml(f.label)}</span><input id='${id}' name='${f.key}' type='${f.kind}' value='${escapeHtml(v)}'></label>`;
}
function extras(key: string): string {
  if (key === 'day2') return `<aside class='course-examples'><h2>Формула сытой тарелки</h2><p>Белок · источник энергии · растительная часть · жиры / вкус.</p><div><span>Яйца + хлеб + овощи + авокадо</span><span>Курица + крупа + овощи</span><span>Рыба + картофель + овощи</span><span>Творог/йогурт + овсянка + ягоды + орехи</span></div><small>Ладонь и кулак — стартовый ориентир, не персональная норма. Фото тарелок ожидают согласования.</small></aside>`;
  if (key === 'day4') return `<aside class='course-examples'><h2>Возможные сценарии</h2><details><summary>Длинный промежуток после обеда</summary><p>«Мостик»: йогурт + фрукт + орехи; бутерброд с индейкой и овощами; творог + фрукт; яйца + хлеб.</p></details><details><summary>Вечерняя тренировка</summary><p>Продумайте приём пищи до нагрузки, чтобы не приходить к ужину с голодом 9/10.</p></details><details><summary>Готовлю семье или занята работой</summary><p>Заранее выберите простую сборку, которую сможете съесть сами.</p></details></aside>`;
  if (key === 'day5') return `<aside class='course-examples'><h2>Четыре опоры</h2><div><span>Голодна → обычная еда</span><span>Сыта и хочу сладкого → могу выбрать десерт</span><span>После десерта → обычный приём пищи</span><span>Не нужно голодать или «отрабатывать»</span></div></aside>`;
  if (key === 'day6') return `<aside class='course-examples'><h2>Примеры дня</h2><p>Это примеры, а не лично рассчитанный рацион.</p><div><span>Омлет, хлеб и овощи · курица с гречкой · рыба с картофелем</span><span>Творог с овсянкой · паста с индейкой · омлет с салатом</span><span>Йогурт с фруктом · рыба с рисом · лаваш с курицей</span></div><p>Нет курицы? Подойдут индейка, рыба, яйца, бобовые или тофу.</p></aside>`;
  if (key === 'day7') { const selected = record('day6').answers.assemblies; return `<aside class='course-examples'><h2>Моя точка ДО → ПОСЛЕ</h2><div>${[['hunger','Вечерний голод'],['sweet','Тяга к сладкому'],['energy','Энергия'],['calm','Спокойствие рядом с едой']].map(([name,label]) => `<span data-compare-key='${name}'>${label}: ${escapeHtml(String(record('before').answers[name] ?? '—'))} → ${escapeHtml(String(record('day7').answers[name] ?? '—'))}</span>`).join('')}</div><h3>Мои реальные сборки</h3><ul>${Array.isArray(selected) ? selected.map(item => `<li>${escapeHtml(item)}</li>`).join('') : ''}</ul></aside>`; }
  return '';
}
function render(): void {
  const node = root(); if (!node || !state) return;
  const nav = `<nav class='course-nav' aria-label='Дни программы'>${keys.slice(1).map((key,i) => `<button type='button' data-go='${key}' ${unlocked(key) ? '' : 'disabled'} aria-current='${current === key ? 'step' : 'false'}'>${i+1}${record(key).complete ? ' ✓' : ''}</button>`).join('')}</nav>`;
  if (current === 'welcome') {
    node.innerHTML = `<div class='course-welcome'><p class='home-kicker'>Ваш доступ открыт</p><h1>Добро пожаловать в «СЫТУЮ»</h1><p>За семь дней вы разберёте свой обычный сценарий питания и соберёте систему, которая помогает приходить к вечеру более сытой и спокойной рядом с едой. Не понадобится считать КБЖУ или запрещать себе сладкое.</p><h2>Как проходить</h2><ul><li>Один день — один небольшой шаг.</li><li>Задания выполняются в обычной жизни.</li><li>Ответы сохраняются прямо на сайте.</li><li>В конце вы увидите сравнение ДО/ПОСЛЕ.</li></ul>${Button({ label:'Начать', attributes:"data-go='before'" })}</div>`;
    return;
  }
  if (current === 'finish') {
    node.innerHTML = `<div class='course-welcome'><p class='home-kicker'>7/7 ✓</p><h1>Вы прошли «СЫТУЮ»</h1><p>Вы увидели свой день питания и нашли решения, которые можете использовать дальше. Если остаются вопросы именно о вашей ситуации, универсальный практикум заканчивается — следующим шагом может быть персональная «Формула тела».</p>${extras('day7')}<div class='course-actions'>${Button({ label:'Разобраться в моей ситуации', href:'/formula-tela/' })}${Button({ label:'Пока продолжу самостоятельно', href:'/', variant:'secondary' })}</div>${nav}</div>`;
    return;
  }
  const lesson = lessons[current], answers = record(current).answers;
  const meals = current === 'day1' ? `<section class='course-part'><h2>Мои приёмы пищи</h2>${Array.from({ length:Math.max(1,Math.min(5,state.mealCount)) },(_,i) => `<div class='course-meal'><h3>Приём пищи ${i+1}</h3>${mealFields(i+1).map(f => field(f,answers[f.key])).join('')}</div>`).join('')}${state.mealCount < 5 ? "<button class='course-add' type='button' data-add-meal>+ Добавить приём пищи</button>" : ''}</section>` : '';
  const video = lesson.video ? `<div class='course-video'><video controls playsinline preload='none' width='720' height='1280'><source src='${escapeHtml(window.siSytaya!.api)}/video/${lesson.video}?_wpnonce=${encodeURIComponent(window.siSytaya!.nonce)}' type='video/mp4'>Ваш браузер не поддерживает видео.</video></div>` : '';
  node.innerHTML = `<div class='course-layout'><div class='course-top'><p class='home-kicker'>СЫТАЯ · ${current === 'before' ? 'Точка ДО' : `День ${current.slice(3)}`}</p><p class='course-progress' aria-live='polite'>Прогресс ${count()}/7</p><div class='course-progress-bar'><span style='width:${count()/7*100}%'></span></div>${nav}</div><div class='course-main'><h1>${escapeHtml(lesson.title)}</h1><p class='course-intro'>${escapeHtml(lesson.intro)}</p>${video}${extras(current)}<form data-course-form>${meals}<section class='course-part'><h2>${current === 'before' ? 'Перед началом' : 'Мои ответы'}</h2>${lesson.fields.map(f => field(f,answers[f.key])).join('')}</section><div class='course-actions'><button type='button' class='ui-button course-save' data-save>Сохранить</button><button type='submit' class='ui-button course-complete'>${current === 'before' ? 'Сохранить и перейти к Дню 1' : current === 'day7' ? 'Завершить «Сытую»' : `День ${current.slice(3)} пройден`}</button></div><p class='course-save-status' role='status' data-save-status>Ответы сохраняются в вашем профиле.</p></form></div></div>`;
  toggleConditions(node.querySelector('form')!);
}
function toggleConditions(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>('[data-condition]').forEach(node => {
    const [name,expected] = (node.dataset.condition ?? '').split(':');
    node.hidden = (form.elements.namedItem(name) as HTMLSelectElement | null)?.value !== expected;
  });
}
function collect(form: HTMLFormElement): Answers {
  const answers: Answers = {};
  const fields = [...lessons[current].fields];
  if (current === 'day1') for (let i=1;i<=Math.max(1,state?.mealCount ?? 1);i++) fields.push(...mealFields(i));
  const data = new FormData(form);
  for (const f of fields) {
    const control = form.querySelector<HTMLElement>(`[name='${f.key}']`);
    if (control?.closest<HTMLElement>('[data-condition]')?.hidden) continue;
    const all = data.getAll(f.key).map(String);
    answers[f.key] = f.kind === 'checks' ? all : (all[0] ?? '');
  }
  return answers;
}
async function save(complete: boolean): Promise<boolean> {
  if (!state || !lessons[current] || saving) return false;
  const form = root()?.querySelector<HTMLFormElement>('[data-course-form]'); if (!form) return false;
  if (complete && !form.reportValidity()) return false;
  const answers = collect(form);
  const status = form.querySelector<HTMLElement>('[data-save-status]');
  if (complete && current === 'day6' && (!Array.isArray(answers.assemblies) || answers.assemblies.length < 3)) {
    if (status) status.textContent = 'Выберите минимум три подходящие сборки.';
    return false;
  }
  saving = true; if (status) status.textContent = 'Сохраняем…';
  try {
    const response = await fetch(`${window.siSytaya!.api}/state`,{ method:'POST', credentials:'same-origin', headers:{ 'Content-Type':'application/json','X-WP-Nonce':window.siSytaya!.nonce }, body:JSON.stringify({ screen:current, answers, complete, mealCount:state.mealCount }) });
    if (!response.ok) throw new Error('save');
    state = await response.json() as State;
    if (complete) {
      if (current === 'before') emitProductEvent('sytaya_before_test_completed');
      else { emitProductEvent(`sytaya_day_${current.slice(3)}_completed`); if (current === 'day7') { emitProductEvent('sytaya_after_test_completed'); emitProductEvent('sytaya_program_completed'); } }
      current = current === 'day7' ? 'finish' : keys[keys.indexOf(current)+1]; render(); window.scrollTo(0,0);
    }
    else if (status) status.textContent = 'Сохранено.';
    return true;
  } catch { if (status) status.textContent = 'Не удалось сохранить. Проверьте соединение и повторите.'; return false; }
  finally { saving = false; }
}
export function sytayaProgramPage(): string {
  return PageShell({ activePath:'/sytaya/', mainClassName:'sytaya-program-page', mainContent:`<section class='course-shell'>${Container({ content:"<div data-sytaya-program><p>Проверяем доступ к программе…</p></div>" })}</section>` });
}
export async function initSytayaProgram(): Promise<void> {
  const node = root(); if (!node) return;
  if (!window.siSytaya?.api || !window.siSytaya.nonce) { node.innerHTML = `<div class='course-gate'><h1>Закрытая программа «СЫТАЯ»</h1><p>Войдите в личный доступ после покупки.</p>${Button({ label:'О программе', href:'/sytaya/' })}</div>`; return; }
  try {
    const response = await fetch(`${window.siSytaya.api}/state`,{ credentials:'same-origin', headers:{ 'X-WP-Nonce':window.siSytaya.nonce } });
    if (!response.ok) throw new Error('access');
    state = await response.json() as State;
    current = !record('before').complete ? 'welcome' : (keys.slice(1).find(key => !record(key).complete) ?? 'finish');
    render();
  } catch {
    node.innerHTML = `<div class='course-gate'><h1>Нужен личный доступ</h1><p>Программа открывается после подтверждённой оплаты. Если вы уже покупали доступ, войдите с тем же email.</p>${Button({ label:'Войти', href:window.siSytaya.login })}${Button({ label:'О программе', href:'/sytaya/', variant:'secondary' })}</div>`;
    return;
  }
  node.addEventListener('click', async event => {
    const target = event.target as HTMLElement;
    const go = target.closest<HTMLButtonElement>('[data-go]');
    if (go) { const key=go.dataset.go!; if (unlocked(key)) { if (current === 'welcome') emitProductEvent('sytaya_program_started'); current=key; render(); window.scrollTo(0,0); } return; }
    if (target.closest<HTMLAnchorElement>("a[href='/formula-tela/']")) emitProductEvent('sytaya_formula_cta_click');
    if (target.closest('[data-save]')) { window.clearTimeout(timer); await save(false); return; }
    if (target.closest('[data-add-meal]') && state && state.mealCount < 5) { await save(false); state.mealCount++; render(); }
  });
  node.addEventListener('submit', async event => { event.preventDefault(); window.clearTimeout(timer); await save(true); });
  node.addEventListener('input', event => {
    const target = event.target as HTMLInputElement;
    if (target.type === 'range') { const output=node.querySelector<HTMLOutputElement>(`[data-range-for='${target.id}']`); if (output) output.value=target.value; if (current === 'day7') { const row=node.querySelector<HTMLElement>(`[data-compare-key='${target.name}']`); if (row) row.textContent = `${target.closest('label')?.querySelector('span')?.textContent?.replace(/\s+\d+\/10$/, '') ?? target.name}: ${String(record('before').answers[target.name] ?? '—')} → ${target.value}`; } }
    window.clearTimeout(timer); timer=window.setTimeout(() => void save(false),1200);
  });
  node.addEventListener('change', event => { const form=(event.target as HTMLElement).closest<HTMLFormElement>('form'); if (form) toggleConditions(form); });
}
