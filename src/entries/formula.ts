import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { initLeadForms } from '../components/sections/LeadForm';
import { mountApp } from '../lib/dom';
import { initSiteMotion } from '../lib/motion';
import { formulaPage } from '../pages/formulaPage';

mountApp(formulaPage());
initMobileMenu();
initLeadForms();
initSiteMotion();
