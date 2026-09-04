import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { initHomeStoriesCarousel } from '../lib/storiesCarousel';
import { homePage } from '../pages/homePage';

mountApp(homePage());
initMobileMenu();
initHomeStoriesCarousel();
initSiteMotion();
