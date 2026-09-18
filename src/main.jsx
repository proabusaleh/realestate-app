import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { CompareProvider } from "./context/CompareContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
