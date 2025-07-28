import { useState, useEffect } from "react";
import { LanguageContext } from "./language-context";
import en from "../translations/en.json";
import it from "../translations/it.json";

// Define the structure of the translation object for typescript
interface TranslationStructure {
  login: {
    welcome_title: string;
    password_prompt: string;
    password_placeholder: string;
    enter_button: string;
    incorrect_password: string;
  };
  header: {
    about_us: string;
    location: string;
    accomodation: string;
    food: string;
    dress_code: string;
    gifts: string;
    rsvp: string;
  };
  guest_view: Record<string, unknown>;
  couple_view: Record<string, unknown>;
}

type Translations = {
  en: TranslationStructure;
  it: TranslationStructure;
};

type LanguageKey = keyof Translations;
type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}.${NestedKeyOf<T[K]>}`
    : K;
}[keyof T & string];
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

  const value = { language, setLanguage, getTranslation };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
