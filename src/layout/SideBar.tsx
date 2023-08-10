import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../features/languages/language_slice";
import { sidebar_motion, view_from_bottom } from "../motions/LayoutMotions";
import {
  selectHeader,
  setDasboardSection,
  setDisplaySideBar,
} from "../features/header/header_slice";
import {
  calculatorIcon,
  chartIcon,
  chatIcon,
  closeIcon,
  contactsIcon,
  homeIcon,
  paperIcon,
  purchaseIcon,
  tickIcon,
} from "../assets/icons/icons";
import { useTranslation } from "react-i18next";
import {
  avatar1,
  avatar10,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
} from "../assets/3d-avatars/avatars";
import { useState } from "react";
export const avatarPics = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
];
const SideBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languageSelector = useSelector(selectLanguage);
  const headerSelector = useSelector(selectHeader);
  const [displayContent, setDisplayContent] = useState<boolean>(false);
  const EnglishsideBarSectionsBtns: { title: string; icon: string }[] = t(
    "sidebar.links",
    { returnObjects: true }
  );
  const PersiansideBarSectionsBtns: {
    mainTitle: string;
    persianTitle: string;
    icon: string;
  }[] = t("sidebar.links", { returnObjects: true });
  const myTeamMates: {
    name: string;
    desc: string;
  }[] = t("sidebar.teamMates.teamMates", { returnObjects: true });
  const icons = [
    purchaseIcon,
    paperIcon,
    tickIcon,
    chatIcon,
    calculatorIcon,
    chartIcon,
  ];
  return (
    <AnimatePresence>
      {headerSelector.displaySideBar && (
        <motion.div
          variants={sidebar_motion(0.5, 0.01, languageSelector.currentLanguage)}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ background: headerSelector.currentTheme.bgColor }}
          className="sidebar-container"
          onAnimationComplete={() => {
            setDisplayContent(true);
          }}
        >
          {displayContent && (
            <div className="sidebar_scroll">
              <motion.div
                variants={view_from_bottom(0.5, 1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="sidebar_header"
                style={{ color: headerSelector.currentTheme.headerColor }}
              >
                <img src={homeIcon} /> {t("sidebar.header")}{" "}
                <button
                  onClick={() => {
                    dispatch(setDisplaySideBar(false));
                  }}
                  className="close-btn"
                  style={{ background: headerSelector.currentTheme.btnColor }}
                >
                  <img src={closeIcon} />
                </button>
              </motion.div>
              <motion.div
                variants={view_from_bottom(0.5, 1.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="sidebar-section-btns"
              >
                {languageSelector.currentLanguage === "en"
                  ? EnglishsideBarSectionsBtns.map((data, index) => {
                      return (
                        <motion.button
                          variants={view_from_bottom(0.3, index / 2 + 0.1)}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          key={index}
                          onClick={() => {
                            dispatch(setDasboardSection(data.title));
                          }}
                          style={{
                            boxShadow: `0 0 4px ${headerSelector.currentTheme.btnColor}`,
                            backgroundColor:
                              headerSelector.currentTheme.btnColor,
                            color: headerSelector.currentTheme.plainTextColor,
                          }}
                        >
                          <img src={icons[index]} /> {data.title}
                          <AnimatePresence>
                            {headerSelector.displayDashboardSection ===
                              data.title && (
                              <motion.span
                                initial={{
                                  scale: 0,
                                  right: 15,
                                  left: "unset",
                                }}
                                animate={{ scale: 1, right: 15, left: "unset" }}
                                exit={{
                                  scale: 0,
                                }}
                                className="btn-circle"
                                style={{
                                  background:
                                    headerSelector.currentTheme.plainTextColor,
                                }}
                              ></motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })
                  : PersiansideBarSectionsBtns.map((data, index) => {
                      return (
                        <motion.button
                          variants={view_from_bottom(0.3, index / 2 + 0.1)}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          key={index}
                          onClick={() => {
                            dispatch(setDasboardSection(data.mainTitle));
                          }}
                          style={{
                            boxShadow: `0 0 4px ${headerSelector.currentTheme.btnColor}`,
                            backgroundColor:
                              headerSelector.currentTheme.btnColor,
                            color: headerSelector.currentTheme.plainTextColor,
                          }}
                        >
                          <img src={icons[index]} /> {data.persianTitle}
                          <AnimatePresence>
                            {headerSelector.displayDashboardSection ===
                              data.mainTitle && (
                              <motion.span
                                initial={{
                                  scale: 0,
                                  left: 15,
                                  right: "unset",
                                }}
                                animate={{ scale: 1, left: 15, right: "unset" }}
                                exit={{
                                  scale: 0,
                                }}
                                className="btn-circle"
                                style={{
                                  background:
                                    headerSelector.currentTheme.plainTextColor,
                                }}
                              ></motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
              </motion.div>
              <motion.div
                variants={view_from_bottom(0.5, 1.6)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="team-mate-container"
              >
                <div
                  className="team-mate-header"
                  style={{ color: headerSelector.currentTheme.plainTextColor }}
                >
                  <img src={contactsIcon} /> {t("sidebar.teamMates.title")}
                </div>
                <div className="team-mate-list">
                  {myTeamMates.map((data, index) => {
                    return (
                      <motion.button
                        variants={view_from_bottom(0.3, index / 2 + 0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        key={index}
                        style={{
                          background: headerSelector.currentTheme.btnColor,
                        }}
                      >
                        <img src={avatarPics[index]} />
                        <div
                          style={{
                            color: headerSelector.currentTheme.plainTextColor,
                          }}
                        >
                          <span className="team-mate-name">{data.name}</span>
                          <span className="team-mate-desc">
                            {data.desc.slice(0, 30)} ...
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
