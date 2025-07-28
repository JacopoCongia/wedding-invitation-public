import { useState, useEffect } from "react";
import { LanguageContext } from "./language-context";
import {
  type LanguageContextType,
  type NestedKeyOf,
  type TranslationStructure,
} from "../types/language";
import en from "../translations/en.json";
import it from "../translations/it.json";

type Translations = {
  en: TranslationStructure;
  it: TranslationStructure;
};

type LanguageKey = keyof Translations;
type NestedValue = string | Record<string, unknown>;

// Available languages and their translation files
const translations = {
  en,
  it,
};

// Language Provider component
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Initialize language from local storage or default to 'it'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "it";
  });

  // Update local storage when language changes
  useEffect(() => {
    localStorage.setItem("selectedLanguage", language);
  }, [language]);

  // Function to get translated text
  const getTranslation = (
    keyPath: NestedKeyOf<TranslationStructure>
  ): string => {
    const keys = keyPath.split(".");
    let current: NestedValue = translations[language as LanguageKey];

    for (const key of keys) {
      if (
        current &&
        typeof current === "object" &&
        Object.prototype.hasOwnProperty.call(current, key)
      ) {
        current = current[key as keyof typeof current] as NestedValue;
      } else {
        return keyPath;
      }
    }

    return String(current);
  };

  const value: LanguageContextType = {
    language,
    setLanguage: (lang: string) => setLanguage(lang as LanguageKey),
    getTranslation,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
