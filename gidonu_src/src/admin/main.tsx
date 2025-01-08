import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App.js";
import "../../index.css";
import { HashRouter } from "react-router-dom";
import { ProvideAuth } from "./auth/authContext.jsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
