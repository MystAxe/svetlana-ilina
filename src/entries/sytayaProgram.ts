import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { initSytayaProgram, sytayaProgramPage } from '../pages/sytayaProgramPage';

mountApp(sytayaProgramPage());
initMobileMenu();
initSiteMotion();
void initSytayaProgram();
