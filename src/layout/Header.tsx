import { useDispatch, useSelector } from "react-redux";
import {
  persianFlag,
  englishFlag,
  settingIcon,
  chatIcon,
  notifIcon,
  hambergerIcon,
  dateIcon,
  searchIcon,
  clockIcon,
} from "../assets/icons/icons";
import {
  selectLanguage,
  setLanguage,
} from "../features/languages/language_slice";
import moment from "moment";
import jmoment from "moment-jalaali";
import FormatHelper from "../utils/formatHelper";
import {
  TABS_TYPE,
  selectHeader,
  setDisplaySideBar,
  setHeaderTab,
} from "../features/header/header_slice";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
const Header = () => {
  const languageSelector = useSelector(selectLanguage);
  const headerSelector = useSelector(selectHeader);
  const dispatch = useDispatch();
  const headerBtns = [
    {
      image: "https://avatars.githubusercontent.com/u/105161078?v=4",
      fun: () => {
        if (headerSelector.currentTab === "profile") {
          dispatch(setHeaderTab(""));
        } else {
          dispatch(setHeaderTab("profile" as TABS_TYPE));
        }
      },
    },
    {
      image: settingIcon,
      fun: () => {
        if (headerSelector.currentTab === "setting") {
          dispatch(setHeaderTab(""));
        } else {
          dispatch(setHeaderTab("setting" as TABS_TYPE));
        }
      },
    },
    {
      image: chatIcon,
      fun: () => {
        if (headerSelector.currentTab === "chat") {
          dispatch(setHeaderTab(""));
        } else {
          dispatch(setHeaderTab("chat" as TABS_TYPE));
        }
      },
    },
    {
      image: notifIcon,
      fun: () => {
        dispatch(setHeaderTab("info" as TABS_TYPE));
      },
    },
  ];
  const { t, i18n } = useTranslation();

  return (
    <div
      className="header-container"
      style={{ background: `${headerSelector.currentTheme.darkColor}` }}
    >
      <div className="top_section">
        <div
          className="right_section"
          style={{ color: headerSelector.currentTheme.plainTextColor }}
        >
          {languageSelector.currentLanguage === "fa" ? (
            <span className="time-container">
              <img src={dateIcon} />
              {FormatHelper.toPersianString(
                jmoment().format("jYYYY/jMM/jDD-HH:mm")
              )}
              <img src={clockIcon} />
            </span>
          ) : (
            <span className="time-container">
              <img src={dateIcon} /> {moment().format("YYYY/MM/DD-HH:mm")}
              <img src={clockIcon} />
            </span>
          )}
        </div>
        <div className="left_section">
          <button
            onClick={() => {
              dispatch(setLanguage("en"));
              i18n.changeLanguage("en");
            }}
            style={{
              background:
                languageSelector.currentLanguage === "en"
                  ? headerSelector.currentTheme.bgColor
                  : " ",
            }}
          >
            <img src={englishFlag} />
          </button>
          <button
            onClick={() => {
              dispatch(setLanguage("fa"));
              i18n.changeLanguage("fa");
            }}
            style={{
              background:
                languageSelector.currentLanguage === "fa"
                  ? headerSelector.currentTheme.bgColor
                  : " ",
            }}
          >
            <img src={persianFlag} />
          </button>
        </div>
      </div>
      <div className="bottom_section">
        <div
          className="right_section"
          style={{ color: headerSelector.currentTheme.headerColor }}
        >
          {window.location.pathname === "/" && (
            <button
              onClick={() => {
                dispatch(
                  setDisplaySideBar(
                    headerSelector.displaySideBar ? false : true
                  )
                );
              }}
              style={{ background: headerSelector.currentTheme.btnColor }}
            >
              <img src={hambergerIcon} />
            </button>
          )}
          {t("header.system")}{" "}
        </div>
        <div className="left_section">
          <div className="search-input">
            <input
              type="search"
              style={{ color: headerSelector.currentTheme.plainTextColor }}
              placeholder={t("header.search_placeholder")}
            />{" "}
            <motion.img
              animate={{
                left: languageSelector.currentLanguage === "en" ? 8 : "unset",
                right: languageSelector.currentLanguage === "fa" ? 8 : "unset",
              }}
              src={searchIcon}
            />{" "}
          </div>
          {headerBtns.map((btn, index) => {
            return (
              <button
                key={index}
                onClick={btn.fun}
                style={{
                  padding: index === 0 ? "0" : "default",
                  background: headerSelector.currentTheme.btnColor,
                }}
                className={` ${index > 1 ? "extra-btn" : ""}`}
              >
                <img src={btn.image} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
