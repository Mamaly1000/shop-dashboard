import React from "react";
import TextInputComponent from "./TextInputComponent";
import { useState, useEffect } from "react";
import { firststep } from "./ProductForm";
import { useContextFunction } from "../../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewProduct,
  selectProducts,
} from "../../features/products/products_slice";
import { useTranslation } from "react-i18next";
import {
  buyerIcon,
  companyIcon,
  labelNameIcon,
} from "../../assets/icons/icons";
import { selectHeader } from "../../features/header/header_slice";
import FormatHelper from "../../utils/formatHelper";
import { selectLanguage } from "../../features/languages/language_slice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { box_motions } from "../../motions/createProductsMotion";

const StepOne = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();
  const contextData = useContextFunction();
  const { currentTheme } = useSelector(selectHeader);
  const { currentLanguage: lang } = useSelector(selectLanguage);
  const { selectedProduct, products } = useSelector(selectProducts);
  const [stepOneData, setStepOneData] = useState<firststep>({
    buyer: "",
    company: "",
    id: 0,
    name: "",
    persianName: "",
    type: "FIRST",
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (contextData!.fakeProducts.length > 0) {
      setStepOneData({
        buyer: selectedProduct.buyer.length > 0 ? selectedProduct.buyer : "",
        company:
          selectedProduct.company.length > 0 ? selectedProduct.company : "",
        persianName:
          selectedProduct.persianName.length > 0
            ? selectedProduct.persianName
            : "",
        name: selectedProduct.name.length > 0 ? selectedProduct.name : "",
        type: "FIRST",
        id:
          selectedProduct.id !== 0
            ? selectedProduct.id
            : contextData!.fakeProducts.length + 1,
      });
    }
  }, [contextData!.fakeProducts, products, selectedProduct, step]);
  const stepValidation = () => {
    if (stepOneData.name.length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.name").toUpperCase(),
        })
      );
    } else if (stepOneData.persianName.length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.persian_name").toUpperCase(),
        })
      );
    } else if (stepOneData.company.length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.company_name").toUpperCase(),
        })
      );
    } else if (stepOneData.buyer.length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.buyer_name").toUpperCase(),
        })
      );
    } else {
      setStep(2);
      dispatch(AddNewProduct(stepOneData));
    }
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
      <TextInputComponent
        icon={labelNameIcon}
        input_type="text"
        label={t("create_procuct_form.name")}
        onchange={(e) => {
          setStepOneData({ ...stepOneData, name: e.target.value });
        }}
        value={
          lang === "fa"
            ? FormatHelper.toPersianString(stepOneData.name)
            : stepOneData.name
        }
      />{" "}
      <TextInputComponent
        icon={labelNameIcon}
        input_type="text"
        label={t("create_procuct_form.persian_name")}
        onchange={(e) => {
          setStepOneData({ ...stepOneData, persianName: e.target.value });
        }}
        value={
          lang === "fa"
            ? FormatHelper.toPersianString(stepOneData.persianName)
            : stepOneData.persianName
        }
      />
      <TextInputComponent
        icon={companyIcon}
        input_type="text"
        label={t("create_procuct_form.company_name")}
        value={
          lang === "fa"
            ? FormatHelper.toPersianString(stepOneData.company)
            : stepOneData.company
        }
        onchange={(e) => {
          setStepOneData({ ...stepOneData, company: e.target.value });
        }}
      />
      <TextInputComponent
        icon={buyerIcon}
        input_type="text"
        label={t("create_procuct_form.buyer_name")}
        value={
          lang === "fa"
            ? FormatHelper.toPersianString(stepOneData.buyer)
            : stepOneData.buyer
        }
        onchange={(e) => {
          setStepOneData({ ...stepOneData, buyer: e.target.value });
        }}
      />
      <div className="steps-action-container">
        <button
          style={{
            background: currentTheme.btnColor,
            color: currentTheme.plainTextColor,
          }}
          onClick={() => {
            stepValidation();
          }}
        >
          {t("create_procuct_form.next_step")}
        </button>
        <button
          onClick={() => {
            setStepOneData({
              buyer: "",
              company: "",
              id: contextData!.fakeProducts.length,
              name: "",
              persianName: "",
              type: "FIRST",
            });
          }}
          className="reset"
        >
          {t("create_procuct_form.reset_btn")}
        </button>
      </div>
    </motion.div>
  );
};

export default StepOne;
