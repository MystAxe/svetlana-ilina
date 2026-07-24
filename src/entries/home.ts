import '../styles/app.css';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { mountApp } from '../lib/dom';
import { homePage } from '../pages/homePage';

mountApp(homePage());
initMobileMenu();
