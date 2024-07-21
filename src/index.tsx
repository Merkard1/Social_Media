import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './1_app/providers/ThemeProvider';

import './1_app/styles/index.scss';
import './6_shared/config/i18n/i18n';
import App from './1_app/App';
import { ErrorBoundary } from './1_app/providers/ErrorBoundary';

render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root'),
);
