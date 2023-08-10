import { useTranslation } from "react-i18next";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { view_from_bottom } from "../../motions/LayoutMotions";
import { useDispatch, useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";
import { useState } from "react";
import {
  filterProducts,
  filtersType,
  selectProducts,
  setRemoveSelectedFilter,
  setSelectedProductsFilters,
  singleFilterType,
} from "../../features/products/products_slice";
import { selectLanguage } from "../../features/languages/language_slice";
import { useContextFunction } from "../../context/ContextProvider";
export const IsSelected = (
  item: {
    name: string;
    type: filtersType;
  },
  data: singleFilterType[]
): {
  type: filtersType;
  mode: "ASC" | "DESC" | "";
} => {
  const check = data.find((f) => f.type === item.type);
  if (!check) {
    return { mode: "", type: "" };
  } else {
    return {
      type: check.type,
      mode: check.mode,
    };
  }
};
const DropDown = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector(selectHeader);
  const { filters: selectedFilters } = useSelector(selectProducts);
  const { currentLanguage: lang } = useSelector(selectLanguage);
  const { t } = useTranslation();
  const tableHeadContext: { name: string; type: filtersType }[] = t(
    "purchasing.table.heads",
    { returnObjects: true }
  );
  const [hoveredFilter, setHoveredFilter] = useState<filtersType | "">("");
  const contextData = useContextFunction();
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={view_from_bottom(0.4, 0.1)}
          initial={{
            opacity: 0,
            left: lang === "fa" ? 10 : "unset",
            right: lang === "en" ? 10 : "unset",
          }}
          animate={{
            opacity: 1,
            left: lang === "fa" ? 10 : "unset",
            right: lang === "en" ? 10 : "unset",
          }}
          exit="exit"
          className="dropdown-container"
        >
          <div
            className="filter-items-container"
            style={{ background: currentTheme.btnColor }}
          >
            {tableHeadContext.map((item, index) => {
              return (
                <motion.div
                  variants={view_from_bottom(0.1, index / 2 + 0.05)}
                  initial="hidden"
                  animate="visible"
                  className="filter-item"
                  key={index}
                  style={{
                    background:
                      IsSelected(item, selectedFilters).type === item.type
                        ? currentTheme.plainTextColor
                        : "rgba(255 255 255/.2)",
                    color:
                      IsSelected(item, selectedFilters).type === item.type
                        ? currentTheme.darkColor
                        : currentTheme.plainTextColor,
                  }}
                >
                  <button
                    onMouseEnter={() => {
                      setHoveredFilter(item.type as filtersType);
                    }}
                    onClick={() => {
                      if (hoveredFilter === item.type) {
                        setHoveredFilter("");
                      } else {
                        setHoveredFilter(item.type as filtersType);
                      }
                      if (
                        IsSelected(item, selectedFilters).type === item.type
                      ) {
                        dispatch(
                          setRemoveSelectedFilter({
                            type: item.type,
                            products: contextData!.fakeProducts,
                          })
                        );
                      }
                    }}
                    className="filter-type-btn"
                  >
                    {item.name}
                  </button>
                  <AnimatePresence>
                    {hoveredFilter === item.type && (
                      <motion.div
                        variants={view_from_bottom(0.3, 0.1)}
                        className="filter-mode-container"
                        style={{
                          background: currentTheme.btnColor,
                          color: currentTheme.plainTextColor,
                        }}
                        initial={{
                          opacity: 0,
                          left: lang === "fa" ? 155 : "unset",
                          right: lang === "en" ? 155 : "unset",
                        }}
                        animate={{
                          opacity: 1,
                          left: lang === "fa" ? 155 : "unset",
                          right: lang === "en" ? 155 : "unset",
                        }}
                        exit="exit"
                        onMouseLeave={() => {
                          setHoveredFilter("");
                        }}
                      >
                        <motion.button
                          variants={view_from_bottom(0.4, 0.4)}
                          initial="hidden"
                          animate="visible"
                          onClick={() => {
                            dispatch(
                              setSelectedProductsFilters({
                                mode: "ASC",
                                type: item.type,
                                products: contextData!.fakeProducts,
                              } as singleFilterType)
                            );
                            setHoveredFilter("");
                          }}
                          style={{
                            background:
                              IsSelected(item, selectedFilters).mode === "ASC"
                                ? currentTheme.plainTextColor
                                : "defualt",
                            color:
                              IsSelected(item, selectedFilters).mode === "ASC"
                                ? currentTheme.darkColor
                                : "defualt",
                          }}
                        >
                          {lang === "en" ? "ASC" : "صعودی"}
                        </motion.button>
                        <motion.button
                          variants={view_from_bottom(0.4, 0.3)}
                          initial="hidden"
                          animate="visible"
                          onClick={() => {
                            dispatch(
                              setSelectedProductsFilters({
                                mode: "DESC",
                                type: item.type,
                                products: contextData!.fakeProducts,
                              } as singleFilterType)
                            );
                            setHoveredFilter("");
                          }}
                          style={{
                            background:
                              IsSelected(item, selectedFilters).mode === "DESC"
                                ? currentTheme.plainTextColor
                                : "defualt",
                            color:
                              IsSelected(item, selectedFilters).mode === "DESC"
                                ? currentTheme.darkColor
                                : "defualt",
                          }}
                        >
                          {lang === "en" ? "DESC" : "نزولی"}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropDown;
