import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp, withoutBasePath } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { staticPage } from '../pages/staticPage';

const routePath = withoutBasePath(window.location.pathname);
const pathname = routePath.endsWith('/') ? routePath : `${routePath}/`;

mountApp(staticPage(pathname));
initMobileMenu();
initSiteMotion();
