import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bulma/css/bulma.min.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./components/context/AuthContext.jsx";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </CookiesProvider>
  </React.StrictMode>
);
