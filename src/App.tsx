import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./utils/ScrollToTop ";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectHeader } from "./features/header/header_slice";
import Dashboard from "./pages/Dashboard";
import "./calander.css";
import { selectLanguage } from "./features/languages/language_slice";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
function App() {
  const headerSelector = useSelector(selectHeader);
  const languageSelector = useSelector(selectLanguage);
  const location = useLocation();
  return (
    <Layout>
      {headerSelector.displayDashboardSection}
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<CreateProduct />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/dashboard*" element={<Navigate to="/dashboard" />} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer
        position={
          languageSelector.currentLanguage === "en" ? "top-right" : "top-left"
        }
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        bodyStyle={{
          fontFamily:
            languageSelector.currentLanguage === "en"
              ? "Roboto Condensed"
              : "Vazirmatn",
        }}
        rtl={languageSelector.currentLanguage === "en" ? false : true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        draggableDirection="x"
        draggablePercent={20}
        theme="dark"
      />
    </Layout>
  );
}

export default App;
