import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 24,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Tooltip
        title={mode === "dark" ? "Switch to Day Mode" : "Switch to Night Mode"}
        arrow
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            width: 44,
            height: 44,
            bgcolor:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.1)"
            }`,
            color: mode === "dark" ? "#fbc02d" : "#1e293b",
            boxShadow: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.1)",
              transform: "scale(1.08) rotate(15deg)",
            },
          }}
          aria-label="toggle day and night theme"
        >
          {mode === "dark" ? (
            <LightModeIcon sx={{ fontSize: 24 }} />
          ) : (
            <DarkModeIcon sx={{ fontSize: 24 }} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
