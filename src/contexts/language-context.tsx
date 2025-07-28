import { createContext } from "react";
import { type LanguageContextType } from "../types/language";

// Create the context
export const LanguageContext = createContext<LanguageContextType>({
  language: "it",
  setLanguage: () => {},
  getTranslation: (key) => key,
});
