import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { svetaStoryPage } from '../pages/svetaStoryPage';

mountApp(svetaStoryPage());
initMobileMenu();
initSiteMotion();
