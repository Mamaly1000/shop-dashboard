import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";
import { useTranslation } from "react-i18next";
import {
  AddNewProduct,
  selectProducts,
} from "../../features/products/products_slice";
import FormatHelper from "../../utils/formatHelper";
import { selectLanguage } from "../../features/languages/language_slice";
import { motion } from "framer-motion";
import { box_motions } from "../../motions/createProductsMotion";
import { useContextFunction } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";

const FinalStep = ({ 
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { Local_products_Table_Pagination, setLocalProductsTablePagination } =
    usePagination();
  const contextData = useContextFunction();
  const { selectedProduct } = useSelector(selectProducts);
  const { currentTheme } = useSelector(selectHeader);
  const { currentLanguage: lang } = useSelector(selectLanguage);
  const { t } = useTranslation();
  const tableData = [
    {
      title: t("create_procuct_form.name"),
      value: selectedProduct.name,
    },
    {
      title: t("create_procuct_form.persian_name"),
      value: selectedProduct.persianName,
    },
    {
      title: t("create_procuct_form.buyer_name"),
      value: selectedProduct.buyer,
    },
    {
      title: t("create_procuct_form.company_name"),
      value: selectedProduct.company,
    },
    {
      title: t("create_procuct_form.category.en"),
      value: selectedProduct.category.en,
    },
    {
      title: t("create_procuct_form.category.fa"),
      value: selectedProduct.category.fa,
    },
    {
      title: t("create_procuct_form.date"),
      value:
        lang === "en"
          ? selectedProduct.addedDate
          : FormatHelper.toPersianString(selectedProduct.addedDate),
    },
    {
      title: t("create_procuct_form.ex_date"),
      value:
        lang === "en"
          ? selectedProduct.expireDate
          : FormatHelper.toPersianString(selectedProduct.expireDate),
    },
    {
      title: t("create_procuct_form.price"),
      value:
        lang === "en"
          ? selectedProduct.price.toLocaleString() + " dollor"
          : FormatHelper.toPersianString(
              selectedProduct.price.toLocaleString()
            ) + " دلار",
    },
    {
      title: t("create_procuct_form.total"),
      value:
        lang === "en"
          ? selectedProduct.totalSupply.toLocaleString()
          : FormatHelper.toPersianString(
              selectedProduct.totalSupply.toLocaleString()
            ),
    },
    {
      title: t("create_procuct_form.desc.en"),
      value: selectedProduct.description,
    },
    {
      title: t("create_procuct_form.desc.fa"),
      value: selectedProduct.persianName,
    },
    {
      title: t("create_procuct_form.active"),
      value: selectedProduct.isActive,
    },
  ];

  const finilizeAddingProduct = () => {
    const check = contextData!.fakeProducts.findIndex(
      (p) => p.id === selectedProduct.id
    );
    if (check < 0) {
      contextData!.setFakeProducts([
        ...contextData!.fakeProducts,
        selectedProduct,
      ]);
    } else {
      const newArray = [...contextData!.fakeProducts];
      newArray[check] = selectedProduct;
      contextData!.setFakeProducts(newArray);
    }
    dispatch(
      AddNewProduct({ type: "FINAL", products: contextData!.fakeProducts })
    );
    setLocalProductsTablePagination({
      currentPage: Local_products_Table_Pagination.currentPage,
      offset: Local_products_Table_Pagination.offset,
      totalPages: contextData!.fakeProducts.length / 10,
    });

    nav("/dashboard");
  };

  return (
    <motion.div
      variants={box_motions(0.5, 0)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="box"
      style={{ background: currentTheme.darkColor }}
    >
      <div className="table-component">
        {tableData.map((data, index) => {
          return (
            <div key={index} className="data-item">
              <span className="title">{data.title} :</span>
              <div className="value">
                {" "}
                {typeof data.value === "boolean" ? (
                  <div
                    className={` circle ${data.value ? "green" : "red"}`}
                  ></div>
                ) : lang === "fa" ? (
                  FormatHelper.toPersianString(data.value + "")
                ) : (
                  FormatHelper.toEnglishString(data.value + "")
                )}{" "}
              </div>
            </div>
          );
        })}
      </div>

      <div className="steps-action-container">
        <button
          style={{
            background: currentTheme.btnColor,
            color: currentTheme.plainTextColor,
          }}
          onClick={() => {
            finilizeAddingProduct();
          }}
        >
          {t("create_procuct_form.finalize")}
        </button>
        <button
          onClick={() => {
            setStep(3);
          }}
          className="reset"
        >
          {t("create_procuct_form.back_btn")}
        </button>
      </div>
    </motion.div>
  );
};

export default FinalStep;
