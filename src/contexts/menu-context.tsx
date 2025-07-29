import { createContext } from "react";
import type { MenuContextType } from "../types/menu";

export const MenuContext = createContext<MenuContextType | null>(null);
