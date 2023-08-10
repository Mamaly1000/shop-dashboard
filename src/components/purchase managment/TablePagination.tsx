import Slider from "react-slick";
import usePagination from "../../hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  setProductsPagination,
} from "../../features/products/products_slice";
import { useMemo } from "react";
import { productsTablePaginationType } from "../../hooks/usePagination";
import { selectHeader } from "../../features/header/header_slice";
import { selectLanguage } from "../../features/languages/language_slice";
import FormatHelper from "../../utils/formatHelper";
import { useTranslation } from "react-i18next";
const TablePagination = () => {
  const dispatch = useDispatch();
  const { currentLanguage: lang } = useSelector(selectLanguage);
  const { setLocalProductsTablePagination } = usePagination();
  const {
    products,
    pagination: { totalPages, currentPage, offset },
  } = useSelector(selectProducts);
  const { currentTheme } = useSelector(selectHeader);
  const { t } = useTranslation();
  const settings = {
    className: "pagination-slider",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
  };
  const pagesBtns = useMemo(() => {
    const pagesArray = [];
    for (let index = totalPages; index > 0; index--) {
      pagesArray.push(index);
    }
    return pagesArray;
  }, [totalPages, currentPage, offset]);
  return (
    <div
      className="pagination-container"
      style={{
        background: currentTheme.btnColor,
        color: currentTheme.plainTextColor,
      }}
    >
      <div className="left-section">
        <h2>{t("purchasing.table.pagination.title")}</h2>
        <Slider {...settings}>
          {pagesBtns.map((page, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  dispatch(
                    setProductsPagination({
                      currentPage: page,
                      offset: (page - 1) * 10,
                      totalPages: totalPages,
                    } as productsTablePaginationType)
                  );
                  setLocalProductsTablePagination({
                    currentPage: page,
                    offset: (page - 1) * 10,
                    totalPages: totalPages,
                  });
                }}
                className={`slide ${
                  page === currentPage ? "selected-page" : ""
                }`}
              >
                {lang === "en"
                  ? page
                  : FormatHelper.toPersianString(String(page))}
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="right-section">
        {lang === "en"
          ? t("purchasing.table.pagination.desc", {
              totalPages: totalPages,
              currentPage: currentPage,
              productsLength: products.length,
              offset: offset + 1,
              endPage: offset + 10,
            })
          : FormatHelper.toPersianString(
              t("purchasing.table.pagination.desc", {
                totalPages: totalPages,
                currentPage: currentPage,
                productsLength: products.length,
                offset: offset + 1,
                endPage: offset + 10,
              })
            )}
      </div>
    </div>
  );
};

export default TablePagination;
