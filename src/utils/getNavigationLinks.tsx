import type { NavLink } from "../types/navlinks";

export const getNavigationLinks = (
  getTranslation: (key: string) => string
): NavLink[] => [
  { label: getTranslation("header.about_us"), id: "about-us" },
  { label: getTranslation("header.location"), id: "venue" },
  { label: getTranslation("header.accommodation"), id: "accommodation" },
  { label: getTranslation("header.food"), id: "menu" },
  { label: getTranslation("header.dress_code"), id: "dress-code" },
  { label: getTranslation("header.gifts"), id: "gifts" },
  { label: getTranslation("header.rsvp"), id: "rsvp" },
];
