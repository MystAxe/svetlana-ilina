import { AboutEditorial } from '../components/home/AboutEditorial';
import { AudienceQuotes } from '../components/home/AudienceQuotes';
import { BlogEditorial } from '../components/home/BlogEditorial';
import { FormulaFeature } from '../components/home/FormulaFeature';
import { HomeFinalCTA } from '../components/home/HomeFinalCTA';
import { HomeHero } from '../components/home/HomeHero';
import { MentorshipFeature } from '../components/home/MentorshipFeature';
import { MethodEditorial } from '../components/home/MethodEditorial';
import { ProblemEditorial } from '../components/home/ProblemEditorial';
import { TestFeature } from '../components/home/TestFeature';
import { TransformationStoryFeature } from '../components/home/TransformationStoryFeature';
import { PageShell } from '../components/layout/PageShell';
import { FAQ } from '../components/sections/FAQ';
import {
  aboutEditorial,
  audienceQuotes,
  blogEditorial,
  formulaFeature,
  homeFaq,
  homeFinalCta,
  homeHero,
  mentorshipFeature,
  methodEditorial,
  problemEditorial,
  testFeature,
} from '../data/home';
import { polinaStory } from '../data/stories';

export function homePage(): string {
  const mainContent = [
    HomeHero(homeHero),
    AudienceQuotes(audienceQuotes),
    ProblemEditorial(problemEditorial),
    MethodEditorial(methodEditorial),
    TestFeature(testFeature),
    FormulaFeature(formulaFeature),
    TransformationStoryFeature({ story: polinaStory }),
    AboutEditorial(aboutEditorial),
    MentorshipFeature(mentorshipFeature),
    BlogEditorial(blogEditorial),
    FAQ({ items: homeFaq, variant: 'editorial' }),
    HomeFinalCTA(homeFinalCta),
  ].join('');

  return PageShell({ activePath: '/', mainContent, mainClassName: 'home-page' });
}
