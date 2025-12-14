import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import React from "react";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <div className="card bg-white dark:bg-slate-800 shadow rounded">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
