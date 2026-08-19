import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CustomThemeProvider } from "./context/ThemeContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);