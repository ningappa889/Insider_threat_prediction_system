import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("theme_mode");
    return savedMode ? savedMode : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme_mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#1976d2",
                },
                background: {
                  default: "#f5f7fb",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#1e293b",
                  secondary: "#64748b",
                },
              }
            : {
                primary: {
                  main: "#60a5fa",
                },
                background: {
                  default: "#0b1329",
                  paper: "#151f38",
                },
                text: {
                  primary: "#f1f5f9",
                  secondary: "#94a3b8",
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
