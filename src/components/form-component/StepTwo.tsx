import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";
import { selectLanguage } from "../../features/languages/language_slice";
import {
  AddNewProduct,
  selectProducts,
} from "../../features/products/products_slice";
import { secondStep } from "./ProductForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextInputComponent from "./TextInputComponent";
import { categoryIcon, dateIcon } from "../../assets/icons/icons";
import DateInputComponent from "./DateInputComponent";
import { toast } from "react-toastify";
import { dateValidation } from "../../utils/dateValidation";
import { motion } from "framer-motion";
import { box_motions } from "../../motions/createProductsMotion";

const StepTwo = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector(selectHeader);
  const { currentLanguage: lang } = useSelector(selectLanguage);
  const { selectedProduct, products } = useSelector(selectProducts);
  const [stepOneData, setStepOneData] = useState<secondStep>({
    type: "SECOND",
    addedDate: "",
    category: {
      en: "",
      fa: "",
    },
    expireDate: "",
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (selectedProduct.id !== 0) {
      setStepOneData({
        type: "SECOND",
        addedDate: "",
        category: {
          en:
            selectedProduct.category.en.length > 0
              ? selectedProduct.category.en
              : "",
          fa:
            selectedProduct.category.fa.length > 0
              ? selectedProduct.category.fa
              : "",
        },
        expireDate: "",
      });
    }
  }, [products, selectedProduct, step]);

  const stepValidation = () => {
    if ((stepOneData.addedDate + "").length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.date").toUpperCase(),
        })
      );
    } else if ((stepOneData.expireDate + "").length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.ex_date").toUpperCase(),
        })
      );
    } else if (
      !dateValidation(
        stepOneData.addedDate + "",
        stepOneData.expireDate + "",
        lang
      )
    ) {
      toast.error(t("form_toasts.date"));
    } else if (stepOneData.category.en.length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.category.en").toUpperCase(),
        })
      );
    } else if (stepOneData.category.fa.length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.category.fa").toUpperCase(),
        })
      );
    } else {
      setStep(3);
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
        icon={categoryIcon}
        input_type="text"
        label={t("create_procuct_form.category.en")}
        onchange={(e) => {
          setStepOneData({
            ...stepOneData,
            category: {
              en: e.target.value,
              fa: stepOneData.category.fa,
            },
          });
        }}
        value={stepOneData.category.en}
      />
      <DateInputComponent
        icon={dateIcon}
        label={t("create_procuct_form.date")}
        onchange={(_e: any, formatted: any) => {
          setStepOneData({
            ...stepOneData,
            addedDate: formatted,
          });
        }}
        index={20}
        value={stepOneData.addedDate + ""}
      />
      <TextInputComponent
        icon={categoryIcon}
        input_type="text"
        label={t("create_procuct_form.category.fa")}
        onchange={(e) => {
          setStepOneData({
            ...stepOneData,
            category: {
              en: stepOneData.category.en,
              fa: e.target.value,
            },
          });
        }}
        value={stepOneData.category.fa}
      />
      <DateInputComponent
        icon={dateIcon}
        label={t("create_procuct_form.ex_date")}
        onchange={(_e: any, formatted: any) => {
          setStepOneData({ ...stepOneData, expireDate: formatted });
        }}
        value={stepOneData.expireDate + ""}
        index={10}
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
              addedDate: "",
              category: {
                en: "",
                fa: "",
              },
              expireDate: "",
              type: "SECOND",
            });
          }}
          className="reset"
        >
          {t("create_procuct_form.reset_btn")}
        </button>
        <button
          onClick={() => {
            setStepOneData({
              addedDate: "",
              category: {
                en: "",
                fa: "",
              },
              expireDate: "",
              type: "SECOND",
            });
            setStep(1);
          }}
          className="reset"
        >
          {t("create_procuct_form.back_btn")}
        </button>
      </div>
    </motion.div>
  );
};

export default StepTwo;
