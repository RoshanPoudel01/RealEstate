import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App/index.tsx";
import Providers from "./providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
