import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { selectLanguage } from "../features/languages/language_slice";
import {
  selectHeader,
  setCurrentTheme,
  themeInterface,
} from "../features/header/header_slice";
import Setting from "../components/headers-components/Setting";
import useTheme from "../hooks/useTheme";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const languageSelector = useSelector(selectLanguage);
  const headerSelector = useSelector(selectHeader);
  const { currentTheme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentTheme(currentTheme as themeInterface));
  }, [currentTheme]);
  return (
    <div
      className={`layout-container ${
        languageSelector.currentLanguage === "fa"
          ? "font-vazir"
          : "font-Condensed"
      }`}
      style={{
        direction: languageSelector.currentLanguage === "fa" ? "rtl" : "ltr",
      }}
    >
      <Header />
      <SideBar />
      <div
        className="back-ground"
        style={{ background: headerSelector.currentTheme.bgColor }}
      ></div>
      <motion.div
        className={`layout-children-container ${
          headerSelector.displaySideBar ? "children-padding" : ""
        }
        `}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {headerSelector.currentTab === "setting" && <Setting />}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
