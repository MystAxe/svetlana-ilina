import { AboutEditorial } from '../components/home/AboutEditorial';
import { AudienceQuotes } from '../components/home/AudienceQuotes';
import { BlogEditorial } from '../components/home/BlogEditorial';
import { CaseFeature } from '../components/home/CaseFeature';
import { FormulaFeature } from '../components/home/FormulaFeature';
import { HomeFinalCTA } from '../components/home/HomeFinalCTA';
import { HomeHero } from '../components/home/HomeHero';
import { MentorshipFeature } from '../components/home/MentorshipFeature';
import { MethodEditorial } from '../components/home/MethodEditorial';
import { ProblemEditorial } from '../components/home/ProblemEditorial';
import { TestFeature } from '../components/home/TestFeature';
import { PageShell } from '../components/layout/PageShell';
import { FAQ } from '../components/sections/FAQ';
import {
  aboutEditorial,
  audienceQuotes,
  blogEditorial,
  caseFeature,
  formulaFeature,
  homeFaq,
  homeFinalCta,
  homeHero,
  mentorshipFeature,
  methodEditorial,
  problemEditorial,
  testFeature,
} from '../data/home';

export function homePage(): string {
  const mainContent = [
    HomeHero(homeHero),
    AudienceQuotes(audienceQuotes),
    ProblemEditorial(problemEditorial),
    MethodEditorial(methodEditorial),
    TestFeature(testFeature),
    FormulaFeature(formulaFeature),
    CaseFeature(caseFeature),
    AboutEditorial(aboutEditorial),
    MentorshipFeature(mentorshipFeature),
    BlogEditorial(blogEditorial),
    FAQ({ items: homeFaq, variant: 'editorial' }),
    HomeFinalCTA(homeFinalCta),
  ].join('');

  return PageShell({ activePath: '/', mainContent, mainClassName: 'home-page' });
}
