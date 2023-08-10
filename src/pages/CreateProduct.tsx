import { useState } from "react";
import ProductForm from "../components/form-component/ProductForm";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { small_box_motion } from "../motions/dashboardMotions";
import { useSelector } from "react-redux";
import { selectHeader } from "../features/header/header_slice";
import ProgressComponent from "../components/form-component/ProgressComponent";

const CreateProduct = () => {
  const nav = useNavigate();
  const [_displayContent, setDisplayContent] = useState(false);
  const { currentTheme } = useSelector(selectHeader);
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);

  return (
    <div className="create-product-page">
      <motion.h1
        variants={small_box_motion(0.5, 0.1)}
        initial="hidden"
        whileInView="visible"
        className="section-header"
        style={{ color: currentTheme.headerColor }}
        onAnimationComplete={() => {
          setDisplayContent(true);
        }}
      >
        {t("create_product_page.header")}
        <button
          style={{
            background: currentTheme.btnColor,
            color: currentTheme.plainTextColor,
          }}
          onClick={() => nav("/dashboard")}
        >
          {t("create_product_page.btn")}
        </button>
      </motion.h1>
      <ProgressComponent step={step} />
      <ProductForm step={step} setStep={setStep} />
    </div>
  );
};

export default CreateProduct;
