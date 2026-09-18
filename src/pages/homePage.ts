import { HomeHero } from '../components/home/HomeHero';
import { HomeAbout, HomeClosing, HomeJournal, HomeMethod, HomeQuizCTA, HomeRecognition, HomeServices, HomeStories } from '../components/home/HomeSections';
import { PageShell } from '../components/layout/PageShell';
import { FAQ } from '../components/sections/FAQ';
import { homeFaq, homeHero } from '../data/home';
import { SignatureDivider } from '../components/decorations/SignatureLine';

export function homePage(): string {
  return PageShell({
    activePath: '/',
    mainClassName: 'home-page',
    mainContent: [HomeHero(homeHero), HomeRecognition(), HomeMethod(), SignatureDivider(), HomeStories(), HomeServices(), SignatureDivider(), HomeAbout(), HomeQuizCTA(), HomeJournal(), FAQ({ items: homeFaq, variant: 'editorial' }), HomeClosing()].join(''),
  });
}
