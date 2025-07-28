export interface TranslationStructure {
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

export type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}.${NestedKeyOf<T[K]>}`
    : K;
}[keyof T & string];

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  getTranslation: (keyPath: NestedKeyOf<TranslationStructure>) => string;
}
