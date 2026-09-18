import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { sytayaPage } from '../pages/sytayaPage';
import { emitProductEvent } from '../lib/productAnalytics';

mountApp(sytayaPage());
emitProductEvent('sytaya_page_view');
initMobileMenu();
initSiteMotion();
