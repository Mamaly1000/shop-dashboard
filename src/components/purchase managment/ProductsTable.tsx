import { useTranslation } from "react-i18next";
import { useState, useTransition, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";
import { downIcon, filterIcon, refreshIcon } from "../../assets/icons/icons";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { small_box_motion } from "../../motions/dashboardMotions";
import {
  filtersType,
  resetProductsFilters,
  selectProducts,
  setRemoveAllProductsSearch,
  setSelectedProductsFilters,
  singleFilterType,
} from "../../features/products/products_slice";
import TablePagination from "./TablePagination";
import DropDown, { IsSelected } from "../dropdown-component/DropDown";
import { useContextFunction } from "../../context/ContextProvider";
import TableComponent from "./TableComponent";
import FormatHelper from "../../utils/formatHelper";
import { selectLanguage } from "../../features/languages/language_slice";
const ProductsTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const contextData = useContextFunction();
  const [searchText, setSearchText] = useState<string>("");
  const [_pending, startTransition] = useTransition();
  const headerSelector = useSelector(selectHeader);
  const { currentLanguage: lang } = useSelector(selectLanguage);
  const productsSelector = useSelector(selectProducts);
  const [displayFilterList, setDisplayFilterList] = useState<boolean>(false);
  const tableHeadContext: { name: string; type: string }[] = t(
    "purchasing.table.heads",
    { returnObjects: true }
  );
  const getFilterName = (type: filtersType) => {
    const check = tableHeadContext.find((f) => f.type === type);
    if (check) {
      return check.name;
    } else {
      return type;
    }
  };
  const searchedData = useMemo(() => {
    const text = FormatHelper.toEnglishString(searchText.toLowerCase());
    return productsSelector.products.filter((p) => {
      return (
        p.name.toLowerCase().includes(text) ||
        p.addedDate.toLowerCase().includes(text) ||
        p.buyer.toLowerCase().includes(text) ||
        p.category.en.toLowerCase().includes(text) ||
        p.category.fa.toLowerCase().includes(text) ||
        p.company.toLowerCase().includes(text) ||
        p.description.toLowerCase().includes(text) ||
        p.expireDate.toLowerCase().includes(text) ||
        String(p.id).toLowerCase().includes(text) ||
        p.persianName.toLowerCase().includes(text) ||
        p.persiandesc.toLowerCase().includes(text) ||
        String(p.price).toLowerCase().includes(text) ||
        String(p.totalSupply).toLowerCase().includes(text)
      );
    });
  }, [searchText, productsSelector]);
  return (
    <motion.div
      variants={small_box_motion(0.5, 1)}
      initial="hidden"
      whileInView="visible"
      className="box"
      style={{ background: headerSelector.currentTheme.darkColor }}
    >
      <div className="table-setting">
        <div
          className="left-section"
          style={{
            background: headerSelector.currentTheme.btnColor,
            color: headerSelector.currentTheme.plainTextColor,
          }}
        >
          {t("purchasing.table.search.title")}
          <hr
            style={{
              width: "1px",
              height: "20px",
              background: headerSelector.currentTheme.plainTextColor,
            }}
          />
          <input
            type="search"
            placeholder={t("purchasing.table.search.placeholder")}
            value={
              lang === "en"
                ? FormatHelper.toEnglishString(searchText)
                : FormatHelper.toPersianString(searchText)
            }
            onChange={(e) => {
              startTransition(() => {
                setSearchText(e.target.value);
              });
            }}
          />
        </div>
        <AnimatePresence>
          {productsSelector.filters.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, type: "tween" }}
              className="filters-preview-container"
              style={{
                background: headerSelector.currentTheme.btnColor,
                color: headerSelector.currentTheme.plainTextColor,
              }}
            >
              {productsSelector.filters.map((f, index) => {
                return (
                  <AnimatePresence>
                    {!!getFilterName(f.type) && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          duration: 0.1,
                          delay: 0.01,
                          type: "tween",
                        }}
                        key={index}
                        style={{
                          background: headerSelector.currentTheme.darkColor,
                        }}
                      >
                        {getFilterName(f.type)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="fast-filters-container"
          style={{ background: headerSelector.currentTheme.btnColor }}
        >
          {t("purchasing.table.filter.fast.title") + " :"}
          {(
            t("purchasing.table.filter.fast.btns", { returnObjects: true }) as {
              name: string;
              type: filtersType;
            }[]
          ).map((data, index) => {
            return (
              <span
                key={index}
                onClick={() => {
                  if (
                    IsSelected(
                      { name: data.name, type: data.type },
                      productsSelector.filters
                    ).type !== data.type
                  ) {
                    dispatch(
                      setSelectedProductsFilters({
                        mode: "ASC",
                        type: data.type,
                        products: contextData!.fakeProducts,
                      } as singleFilterType)
                    );
                  } else {
                    toast.warn(
                      lang === "en" ? "selected before" : "قبلا انتخاب شده است"
                    );
                  }
                }}
                style={{
                  background:
                    IsSelected(data, productsSelector.filters).type ===
                    data.type
                      ? headerSelector.currentTheme.plainTextColor
                      : headerSelector.currentTheme.darkColor,
                  color:
                    IsSelected(data, productsSelector.filters).type ===
                    data.type
                      ? headerSelector.currentTheme.darkColor
                      : headerSelector.currentTheme.plainTextColor,
                }}
              >
                {data.name}
              </span>
            );
          })}
        </div>
        <div className="right-section">
          <button
            style={{
              background: headerSelector.currentTheme.btnColor,
              color: headerSelector.currentTheme.plainTextColor,
            }}
            onClick={() => {
              dispatch(resetProductsFilters(contextData!.fakeProducts));
              dispatch(setRemoveAllProductsSearch(contextData!.fakeProducts));
              setSearchText("");
              toast.success(t("purchasing.table.refresh"));
            }}
          >
            <img src={refreshIcon} />
          </button>
          <button
            style={{
              background: headerSelector.currentTheme.btnColor,
              color: headerSelector.currentTheme.plainTextColor,
            }}
            className="filter-btn"
            onClick={() => setDisplayFilterList((prev) => !prev)}
          >
            <img src={filterIcon} />
            <hr
              style={{
                width: "1px",
                height: "20px",
                background: headerSelector.currentTheme.plainTextColor,
              }}
            />
            {t("purchasing.table.filter.title")}
            <hr
              style={{
                width: "1px",
                height: "20px",
                background: headerSelector.currentTheme.plainTextColor,
              }}
            />
            <motion.img
              src={downIcon}
              animate={{ rotate: displayFilterList ? 180 : 0 }}
              transition={{ duration: 0.1, type: "tween" }}
            />
          </button>
          <DropDown show={displayFilterList} setShow={setDisplayFilterList} />
        </div>
      </div>
      <TableComponent data={searchedData} />
      <TablePagination />
    </motion.div>
  );
};

export default ProductsTable;
