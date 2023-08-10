import { useState, useEffect } from "react";
import ProductForm from "../components/form-component/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { small_box_motion } from "../motions/dashboardMotions";
import { useDispatch, useSelector } from "react-redux";
import { selectHeader } from "../features/header/header_slice";
import ProgressComponent from "../components/form-component/ProgressComponent";
import {
  fakeProductInterface,
  useContextFunction,
} from "../context/ContextProvider";
import { setEditProduct } from "../features/products/products_slice";

const CreateProduct = () => {
  const nav = useNavigate();
  const [displayContent, setDisplayContent] = useState(false);
  const { currentTheme } = useSelector(selectHeader);
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const param = useParams();
  const contextData = useContextFunction();
  const dispatch = useDispatch();
  const checkParam = (
    param: string
  ): {
    value: boolean;
    obj: fakeProductInterface;
  } => {
    const check = contextData!.fakeProducts.findIndex((p) => p.id === +param);
    if (check < 0) {
      return {
        value: false,
        obj: {
          addedDate: "",
          buyer: "",
          category: {
            en: "",
            fa: "",
          },
          company: "",
          description: "",
          expireDate: "",
          id: 0,
          isActive: false,
          name: "",
          persiandesc: "",
          persianName: "",
          price: 0,
          totalSupply: 0,
        },
      };
    } else {
      return {
        value: true,
        obj: contextData!.fakeProducts[check],
      };
    }
  };
  useEffect(() => {
    if (checkParam(param.id as string).value) {
      dispatch(setEditProduct(checkParam(param.id as string).obj));
    }
  }, []);
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
        {t("edit_product_page.header")}
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
      {displayContent && <ProgressComponent step={step} />}
      <ProductForm step={step} setStep={setStep} />
    </div>
  );
};

export default CreateProduct;
