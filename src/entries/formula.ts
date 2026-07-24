import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { initLeadForms } from '../components/sections/LeadForm';
import { mountApp } from '../lib/dom';
import { formulaPage } from '../pages/formulaPage';

mountApp(formulaPage());
initMobileMenu();
initLeadForms();
