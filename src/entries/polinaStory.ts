import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { polinaStoryPage } from '../pages/polinaStoryPage';

mountApp(polinaStoryPage());
initMobileMenu();
initSiteMotion();
