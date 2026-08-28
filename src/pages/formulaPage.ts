import { PageShell } from '../components/layout/PageShell';
import { ExpertPreview } from '../components/sections/ExpertPreview';
import { FAQ } from '../components/sections/FAQ';
import { Hero } from '../components/sections/Hero';
import { LeadForm } from '../components/sections/LeadForm';
import { StoryCard } from '../components/stories/StoryCard';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { formulaAudience, formulaComparison, formulaExpert, formulaFaq, formulaFrame, formulaHero, formulaIncludes, formulaOutcome, formulaPrice, formulaProcess } from '../data/formula';
import { dashaStory, polinaStory } from '../data/stories';
import { escapeHtml } from '../lib/dom';

function section(id: string, eyebrow: string, title: string, content: string, soft = false): string {
  return `<section class="content-section ${soft ? 'content-section--soft' : ''}" id="${id}" aria-labelledby="${id}-title">${Container({ content: `<p class="home-kicker">${escapeHtml(eyebrow)}</p><h2 class="home-title" id="${id}-title">${escapeHtml(title)}</h2>${content}` })}</section>`;
}
function list(items: string[]): string {
  return `<ul class="detail-list">${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

export function formulaPage(): string {
  const audience = section('audience', 'Ваша точка старта', 'Когда хочется ясности.', `<div class="info-grid info-grid--4">${formulaAudience.items.map(item => `<div class="info-card"><p>${escapeHtml(item)}</p></div>`).join('')}</div>`);
  const frame = section('frame', formulaFrame.eyebrow, 'Разобраться в привычках. Понять следующие шаги.', `<div class="info-grid info-grid--2"><article class="info-card"><h3>${escapeHtml(formulaFrame.is.title)}</h3>${list(formulaFrame.is.items)}</article><article class="info-card info-card--muted"><h3>${escapeHtml(formulaFrame.isNot.title)}</h3>${list(formulaFrame.isNot.items)}</article></div>`, true);
  const process = section('process', 'Как проходит разбор', 'От запроса — к понятному плану.', `<ol class="info-grid info-grid--4 process-cards">${formulaProcess.steps.map((step, index) => `<li class="info-card"><span class="step-number">${index + 1}</span><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.text)}</p></li>`).join('')}</ol>`);
  const includes = section('includes', formulaIncludes.eyebrow, 'В фокусе — ваша жизнь.', `<div class="detail-split"><p class="home-lead">Рассматриваем питание, нагрузку и повседневные привычки вместе. С учётом вашего ритма и того, что сейчас реально изменить.</p>${list(formulaIncludes.items)}</div>`, true);
  const outcome = section('outcome', 'После встречи', 'Меньше разрозненных советов. Больше ясности.', `<div class="info-grid">${formulaOutcome.cards.map(card => `<article class="info-card"><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.text)}</p></article>`).join('')}</div><p class="section-footnote">Формат итоговых материалов и длительность встречи уточняются до записи.</p>`);
  const comparison = section('comparison', formulaComparison.eyebrow, 'Знакомство или подробный разбор?', `<div class="info-grid info-grid--2">${formulaComparison.columns.map(column => `<article class="info-card"><h3>${escapeHtml(column.title)}</h3><p>${escapeHtml(column.text)}</p></article>`).join('')}</div>`, true);
  const expert = section('expert', 'С вами на встрече', 'Светлана Ильина', `<div class="mt-8">${ExpertPreview(formulaExpert)}</div>`);
  const stories = section('stories', 'Истории клиентов', 'С чего начинали другие.', `<div class="story-card-grid story-card-grid--two">${[dashaStory, polinaStory].map(story => StoryCard(story, 'h3')).join('')}</div>`, true);
  const price = section('price', formulaPrice.eyebrow, formulaPrice.title, `<div class="price-row"><p class="home-lead">${escapeHtml(formulaPrice.text)}</p>${Button(formulaPrice.action)}</div><p class="status-note">${escapeHtml(formulaPrice.status)}</p>`);
  return PageShell({
    activePath: '/formula-tela/', mainClassName: 'formula-page',
    mainContent: [Hero(formulaHero), audience, frame, process, includes, outcome, comparison, expert, stories, price, FAQ({ items: formulaFaq, id: 'formula-faq', text: 'Организационные детали пока отмечены как рабочие.' }), LeadForm()].join(''),
  });
}
