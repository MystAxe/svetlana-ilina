import addPlusUrl from '../../assets/icons/coolicons/add-plus.svg';
import arrowDownUrl from '../../assets/icons/coolicons/arrow-down-md.svg';
import arrowLeftUrl from '../../assets/icons/coolicons/arrow-left-md.svg';
import arrowRightUrl from '../../assets/icons/coolicons/arrow-right-md.svg';
import arrowUpRightUrl from '../../assets/icons/coolicons/arrow-up-right-md.svg';
import checkUrl from '../../assets/icons/coolicons/check.svg';
import closeUrl from '../../assets/icons/coolicons/close-md.svg';
import playUrl from '../../assets/icons/coolicons/play.svg';
import { escapeHtml } from '../../lib/dom';

const coolIconUrls = {
  'add-plus': addPlusUrl,
  'arrow-down': arrowDownUrl,
  'arrow-left': arrowLeftUrl,
  'arrow-right': arrowRightUrl,
  'arrow-up-right': arrowUpRightUrl,
  check: checkUrl,
  close: closeUrl,
  play: playUrl,
} as const;

export type CoolIconName = keyof typeof coolIconUrls;

export function CoolIcon(name: CoolIconName, className = ''): string {
  const source = escapeHtml(coolIconUrls[name]);
  return `<span class="coolicon ${className}" style="--coolicon-source: url(&quot;${source}&quot;)" data-coolicon="${name}" aria-hidden="true"></span>`;
}
