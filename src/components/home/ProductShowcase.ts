import { products } from '../../data/products';
import { escapeHtml } from '../../lib/dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function ProductShowcase(): string {
  const cards = products.map((product, index) => `
    <article class='product-tile ${index === 1 ? 'product-tile--featured' : ''}' data-motion-item>
      <svg class='product-tile__trace' viewBox='0 0 300 84' preserveAspectRatio='none' aria-hidden='true' focusable='false'><path d='M1 83 V29 Q1 1 29 1 H299' pathLength='100' /></svg>
      <div><p class='home-kicker'>${escapeHtml(product.eyebrow)}</p><h3>${escapeHtml(product.name)}</h3><p class='product-tile__description'>${escapeHtml(product.description)}</p></div>
      <ul>${product.points.map(point => `<li>${escapeHtml(point)}</li>`).join('')}</ul>
      <div class='product-tile__bottom'><p class='product-tile__price'>${escapeHtml(product.price)}<span>${escapeHtml(product.format)}</span></p>${Button({ label: product.action, href: product.href, variant: index === 1 ? 'primary' : 'secondary' })}</div>
    </article>`).join('');
  return `<section class='home-section products-section' id='products' aria-labelledby='services-title'>${Container({ content: `
    <div class='section-intro' data-motion-group><div><p class='home-kicker' data-motion-item>Продукты</p><h2 class='home-title' id='services-title' data-motion-item>Выберите свой следующий шаг.</h2></div><p class='home-lead' data-motion-item>Можно начать самостоятельно, разобраться в своей ситуации или пройти путь с личным сопровождением.</p></div>
    <div class='product-grid' data-motion-group>${cards}</div>` })}</section>`;
}
