import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./1_app/providers/ThemeProvider";

import "./1_app/styles/index.scss";
import "./6_shared/config/i18n/i18n";
import App from "./1_app/App";
import { ErrorBoundary } from "./1_app/providers/ErrorBoundary";
import { StoreProvider } from "./1_app/providers/StoreProvider";

const container = document.getElementById("root");

if (!container) {
  throw new Error("root not found");
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
);
