import { Footer } from './Footer';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import { LeadDialog } from './LeadDialog';

interface PageShellProps {
  activePath: string;
  mainContent: string;
  mainClassName?: string;
}

export function PageShell({ activePath, mainContent, mainClassName = '' }: PageShellProps): string {
  return `
    <a class="skip-link" href="#main-content">Перейти к содержанию</a>
    ${Header(activePath)}
    ${MobileMenu(activePath)}
    <main class="${mainClassName}" id="main-content" tabindex="-1">${mainContent}</main>
    ${Footer()}
    ${LeadDialog()}
  `;
}
