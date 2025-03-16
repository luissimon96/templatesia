"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Componente para usar o tema
export function useTheme() {
  const { theme, setTheme } = React.useContext(
    React.createContext({ theme: "", setTheme: (_: string) => { } })
  );

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDarkTheme: theme === "dark",
    isLightTheme: theme === "light",
  };
} 