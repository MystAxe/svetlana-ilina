import type { EditorialImage } from '../../data/home';
import { escapeHtml } from '../../lib/dom';
import { EditorialPicture } from '../home/HomeHero';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface HeroAction { label: string; href: string; }
interface HeroProps {
  eyebrow: string; title: string; text: string;
  primaryAction: HeroAction; secondaryAction?: HeroAction;
  outcome?: string; image?: EditorialImage;
}

export function Hero({ eyebrow, title, text, primaryAction, secondaryAction, outcome, image }: HeroProps): string {
  return `<section class="service-hero" aria-labelledby="hero-title">${Container({ content: `
    <div class="service-hero__grid"><div class="service-hero__copy" data-motion-group>
      <p class="home-kicker" data-motion-item>${escapeHtml(eyebrow)}</p>
      <h1 id="hero-title" data-motion-item>${escapeHtml(title)}</h1>
      <p class="service-hero__lead" data-motion-item>${escapeHtml(text)}</p>
      ${outcome ? `<p class="service-hero__outcome" data-motion-item>${escapeHtml(outcome)}</p>` : ''}
      <div class="service-hero__actions" data-motion-item>${Button(primaryAction)}${secondaryAction ? Button({ ...secondaryAction, variant: 'secondary' }) : ''}</div>
    </div>${image ? `<div class="service-hero__photo" data-motion-item>${EditorialPicture({ image, eager: true, showLabel: false, sizes: '(min-width: 1024px) 40vw, 90vw' })}</div>` : ''}</div>
  ` })}</section>`;
}
