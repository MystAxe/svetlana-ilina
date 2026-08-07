import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { vikaStoryPage } from '../pages/vikaStoryPage';

mountApp(vikaStoryPage());
initMobileMenu();
initSiteMotion();
