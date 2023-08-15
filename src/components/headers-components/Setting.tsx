import { useDispatch } from "react-redux";
import { ThemeColors } from "../../dummy/themecolors";
import useTheme from "../../hooks/useTheme";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { setHeaderTab } from "../../features/header/header_slice";

const Setting = () => {
  const { setLocalCurrentTheme, currentTheme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{
        y: -10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{ y: -10, opacity: 0 }}
      className="setting-container"
      onMouseLeave={() => {
        dispatch(setHeaderTab(""));
      }}
    >
      <span
        className="setting-title"
        style={{ color: currentTheme.headerColor }}
      >
        {t("header.setting.title")}
      </span>
      <div className="preview-box">
        <div
          className="preview-bg"
          style={{ background: currentTheme.bgColor }}
        ></div>
        <div className="setting-context">
          <span style={{ color: currentTheme.headerColor }}>
            {t("header.setting.header")}
          </span>
          <p style={{ color: currentTheme.plainTextColor }}>
            {t("header.setting.p")}
          </p>
          <button style={{ background: currentTheme.btnColor }}>
            {t("header.setting.btn")}{" "}
          </button>
        </div>
      </div>
      <div className="theme-btns">
        {ThemeColors.map((btn, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setLocalCurrentTheme(btn);
              }}
              style={{ background: btn.btnColor }}
            ></button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Setting;
