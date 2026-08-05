import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { initStoryFilters } from '../components/stories/StoryFilters';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { storiesArchivePage } from '../pages/storiesArchivePage';

mountApp(storiesArchivePage());
initMobileMenu();
initStoryFilters();
initSiteMotion();
