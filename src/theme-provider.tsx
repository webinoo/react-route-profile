import { createContext, type ReactNode, useContext } from "react";
import { theme as defaultTheme, type Theme } from "./theme";

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider = ({
  theme = defaultTheme,
  children,
}: {
  theme?: Theme;
  children: ReactNode;
}) => <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;

export const useTheme = () => useContext(ThemeContext);
