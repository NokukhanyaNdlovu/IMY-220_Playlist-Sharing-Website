import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/User.jsx";
import { SongProvider } from "./context/Song.jsx";
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
    <UserProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
