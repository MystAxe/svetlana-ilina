import '../styles/app.css';
import { NoopQuizSubmissionAdapter } from '../adapters/NoopQuizSubmissionAdapter';
import { initMobileMenu } from '../components/layout/MobileMenu';
import { quizDefinition } from '../data/quiz';
import { getRequiredElement, mountApp } from '../lib/dom';
import { quizPage } from '../pages/quizPage';
import { QuizController } from '../quiz/controller';

mountApp(quizPage());
initMobileMenu();

const quizRoot = getRequiredElement<HTMLElement>('#quiz-root');

try {
  new QuizController(quizRoot, quizDefinition, new NoopQuizSubmissionAdapter()).mount();
} catch {
  quizRoot.innerHTML = `
    <div role="alert">
      <h1 class="font-display text-3xl">Тест временно недоступен</h1>
      <p class="mt-4 text-ink-soft">Проверьте конфигурацию mock-вопросов.</p>
    </div>
  `;
}
