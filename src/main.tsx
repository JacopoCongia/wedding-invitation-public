import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./contexts/LanguageProvider.tsx";
import { MenuProvider } from "./contexts/MenuProvider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MenuProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MenuProvider>
  </StrictMode>
);
