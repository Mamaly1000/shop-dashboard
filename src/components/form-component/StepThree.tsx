import React from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";
import {
  AddNewProduct,
  selectProducts,
} from "../../features/products/products_slice";
import { thirdStep } from "./ProductForm";
import TextInputComponent from "./TextInputComponent";
import { aquareIcon, descIcon, priceIcon } from "../../assets/icons/icons";
import FormatHelper from "../../utils/formatHelper";
import TextAreaInputComponent from "./TextAreaInputComponent";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { box_motions } from "../../motions/createProductsMotion";

const StepThree = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector(selectHeader);
  const { selectedProduct, products } = useSelector(selectProducts);
  const [isActive, setIsActive] = useState<boolean>(selectedProduct.isActive);
  const [stepOneData, setStepOneData] = useState<thirdStep>({
    type: "THIRD",
    description:
      selectedProduct.description !== "" ? selectedProduct.description : "",
    isActive: selectedProduct.isActive ? selectedProduct.isActive : false,
    persiandesc:
      selectedProduct.persiandesc !== "" ? selectedProduct.persiandesc : "",
    price: selectedProduct.price !== 0 ? selectedProduct.price : 0,
    totalSupply:
      selectedProduct.totalSupply !== 0 ? selectedProduct.totalSupply : 0,
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (selectedProduct.description.length > 0) {
      setStepOneData({
        type: "THIRD",
        description:
          selectedProduct.description !== "" ? selectedProduct.description : "",
        isActive: selectedProduct.isActive ? selectedProduct.isActive : false,
        persiandesc:
          selectedProduct.persiandesc !== "" ? selectedProduct.persiandesc : "",
        price: selectedProduct.price !== 0 ? selectedProduct.price : 0,
        totalSupply:
          selectedProduct.totalSupply !== 0 ? selectedProduct.totalSupply : 0,
      });
    }
    console.log(stepOneData);
  }, [selectedProduct, products, step]);
  useEffect(() => {
    setStepOneData({ ...stepOneData, isActive: isActive });
  }, [isActive]);
  const stepValidation = () => {
    if (+FormatHelper.toEnglishString(stepOneData.price + "") === 0) {
      toast.error(
        t("form_toasts.number", {
          title: t("create_procuct_form.price").toUpperCase(),
        })
      );
    } else if (
      +FormatHelper.toEnglishString(stepOneData.totalSupply + "") === 0
    ) {
      toast.error(
        t("form_toasts.number", {
          title: t("create_procuct_form.total").toUpperCase(),
        })
      );
    } else if (stepOneData.description.length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.desc.en").toUpperCase(),
        })
      );
    } else if (stepOneData.persiandesc.length === 0) {
      toast.error(
        t("form_toasts.string", {
          title: t("create_procuct_form.desc.fa").toUpperCase(),
        })
      );
    } else {
      setStep(4);
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
        icon={priceIcon}
        input_type="number"
        label={t("create_procuct_form.price")}
        onchange={(e) => {
          setStepOneData({ ...stepOneData, price: +e.target.value });
        }}
        value={stepOneData.price}
      />
      <TextInputComponent
        icon={aquareIcon}
        input_type="number"
        label={t("create_procuct_form.total")}
        onchange={(e) => {
          setStepOneData({ ...stepOneData, totalSupply: +e.target.value });
        }}
        value={stepOneData.totalSupply}
      />
      <TextAreaInputComponent
        icon={descIcon}
        label={t("create_procuct_form.desc.en")}
        onchange={(e) => {
          setStepOneData({
            ...stepOneData,
            description: e.target.value,
          });
        }}
        value={stepOneData.description}
      />{" "}
      <TextAreaInputComponent
        icon={descIcon}
        label={t("create_procuct_form.desc.fa")}
        onchange={(e) => {
          setStepOneData({
            ...stepOneData,
            persiandesc: e.target.value,
          });
        }}
        value={stepOneData.persiandesc}
      />
      <div
        className="checkbox_group"
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
      >
        {t("create_procuct_form.active")}
        <span className="circle-component">
          <AnimatePresence>
            {!!isActive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3, type: "tween" }}
                className="tick"
              ></motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
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
              type: "THIRD",
              description: "",
              isActive: false,
              persiandesc: "",
              price: 0,
              totalSupply: 0,
            });
          }}
          className="reset"
        >
          {t("create_procuct_form.reset_btn")}
        </button>
        <button
          onClick={() => {
            setStepOneData({
              type: "THIRD",
              description: "",
              isActive: false,
              persiandesc: "",
              price: 0,
              totalSupply: 0,
            });
            setStep(2);
          }}
          className="reset"
        >
          {t("create_procuct_form.back_btn")}
        </button>
      </div>
    </motion.div>
  );
};

export default StepThree;
