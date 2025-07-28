import { useContext } from "react";
import { LanguageContext } from "../contexts/language-context";

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
