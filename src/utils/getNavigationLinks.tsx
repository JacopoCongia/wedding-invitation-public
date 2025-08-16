import type { NavLink } from "../types/navlinks";

export const getNavigationLinks = (
  getTranslation: (key: string) => string
): NavLink[] => [
  { label: getTranslation("header.us"), id: "us" },
  { label: getTranslation("header.where_and_when"), id: "where-and-when" },
  { label: getTranslation("header.menu"), id: "menu" },
  { label: getTranslation("header.gift"), id: "gift" },
  { label: getTranslation("header.rsvp"), id: "rsvp" },
];
