import { useState, useEffect } from "react";
import { LanguageContext } from "./language-context";
import en from "../translations/en.json";
import it from "../translations/it.json";

// Available languages and their translation files
const translations = {
  en,
  it,
};

// Language Provider component
export const LanguageProvider = ({ children }) => {
  // Initialize language from local storage or default to 'it'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "it";
  });

  // Update local storage when language changes
  useEffect(() => {
    localStorage.setItem("selectedLanguage", language);
  }, [language]);

  // Function to get translated text
  const t = (keyPath) => {
    const keys = keyPath.split(".");
    let text = translations[language];
    for (const key of keys) {
      if (text && typeof text === "object" && text.hasOwnProperty(key)) {
        text = text[key];
      } else {
        // Fallback to English if translation is missing
        let fallbackText = translations["en"];
        for (const fallbackKey of keys) {
          if (
            fallbackText &&
            typeof fallbackText === "object" &&
            fallbackText.hasOwnProperty(fallbackKey)
          ) {
            fallbackText = fallbackText[fallbackKey];
          } else {
            return `MISSING_TRANSLATION: ${keyPath}`; // Indicate missing translation
          }
        }
        return fallbackText;
      }
    }
    return text || keyPath; // Return keyPath if translation is empty or not found
  };

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
