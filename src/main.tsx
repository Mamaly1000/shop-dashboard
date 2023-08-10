import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/tailwind.scss";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import DashboardAppContextComponent from "./context/ContextProvider.tsx";
import store from "./app/store.ts";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import faLanguage from "./languages/fa.json";
import enLanguage from "./languages/en.json";
i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: enLanguage },
    fa: { translation: faLanguage },
  },
  interpolation: { escapeValue: false },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DashboardAppContextComponent>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DashboardAppContextComponent>
    </Provider>
  </React.StrictMode>
);
