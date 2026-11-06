import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/effects.css";
import "./lib/gsap.js";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(<App />);
