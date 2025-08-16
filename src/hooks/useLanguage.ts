import { useContext } from "react";
import { LanguageContext } from "../contexts/language-context";

// Define the type for the language context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  getTranslation: (key: string) => string;
}

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext) as LanguageContextType;
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
