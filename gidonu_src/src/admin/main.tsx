import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App.js";
import "../../index.css";
import { HashRouter } from "react-router-dom";
import { ProvideAuth } from "./auth/authContext.jsx";
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById("react-root");

createRoot(root!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
