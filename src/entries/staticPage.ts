import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { staticPage } from '../pages/staticPage';

const pathname = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;

mountApp(staticPage(pathname));
initMobileMenu();
initSiteMotion();
