import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";
import { small_box_motion } from "../../motions/dashboardMotions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./ProductsTable";
import { setEditProduct } from "../../features/products/products_slice";
import { fakeProductInterface } from "../../context/ContextProvider";

const PurchaseManageMent = () => {
  const headerSelector = useSelector(selectHeader);
  const nav = useNavigate();
  const { t } = useTranslation();
  const [displayContent, setDisplayContent] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <motion.div className="purchase-container">
      <motion.h1
        variants={small_box_motion(0.5, 0.1)}
        initial="hidden"
        whileInView="visible"
        className="section-header"
        style={{ color: headerSelector.currentTheme.headerColor }}
        onAnimationComplete={() => {
          setDisplayContent(true);
        }}
      >
        {t("purchasing.title")}{" "}
        <button
          style={{
            background: headerSelector.currentTheme.btnColor,
            color: headerSelector.currentTheme.plainTextColor,
          }}
          onClick={() => {
            dispatch(
              setEditProduct({
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
              } as fakeProductInterface)
            );
            nav("/add-product");
          }}
        >
          {t("purchasing.addbtn")}
        </button>
      </motion.h1>
      {/* {displayContent && (
        <motion.div
          variants={small_box_motion(0.5, 0.1)}
          initial="hidden"
          whileInView="visible"
          className="box"
          style={{ background: headerSelector.currentTheme.darkColor }}
        >
          <ReactApexChart
            series={[
              {
                name:
                  languageSelector.currentLanguage === "en"
                    ? "lower than 250 dollor"
                    : FormatHelper.toPersianString("کمتر از 250 دلار"),
                data: contextData!.fakeProducts
                  .filter((product) => product.price < 250)
                  .map((product) => product.price),
              },
              {
                name:
                  languageSelector.currentLanguage === "en"
                    ? "lower than 500 dollor"
                    : FormatHelper.toPersianString("کمتر از 500 دلار"),
                data: contextData!.fakeProducts
                  .filter((product) => product.price < 500)
                  .map((product) => product.price),
              },
              {
                name:
                  languageSelector.currentLanguage === "en"
                    ? "lower than 750 dollor"
                    : FormatHelper.toPersianString("کمتر از 750 دلار"),
                data: contextData!.fakeProducts
                  .filter((product) => product.price < 750)
                  .map((product) => product.price),
              },
              {
                name:
                  languageSelector.currentLanguage === "en"
                    ? "lower than 1000 dollor"
                    : FormatHelper.toPersianString("کمتر از 1000 دلار"),
                data: contextData!.fakeProducts
                  .filter((product) => product.price < 1000)
                  .map((product) => product.price),
              },
              {
                name:
                  languageSelector.currentLanguage === "en"
                    ? "higher than 1000 dollor"
                    : FormatHelper.toPersianString("بیشتر از 1000 دلار"),
                data: contextData!.fakeProducts
                  .filter((product) => product.price > 1000)
                  .map((product) => product.price),
              },
            ]}
            options={{
              chart: {
                type: "bar",
                height: 600,
                stacked: true,
                stackType: "100%",
                width: "100%",
                animations: { enabled: false },
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      position: "bottom",
                      offsetX: -10,
                      offsetY: 0,
                    },
                  },
                },
              ],
              xaxis: {
                categories: contextData!.fakeProducts.map((product) => {
                  return moment(product.addedDate).format("YYYY/MMM/DD");
                }),
                labels: {
                  show: false,
                },
                axisBorder: {
                  color: "rgba(255 255 255 /.2)",
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
                axisBorder: {
                  color: "rgba(255 255 255 /.2)",
                },
              },
              fill: {
                opacity: 1,
              },
              legend: {
                position: "bottom",
                offsetX: 0,
                offsetY: 5,
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
                fontWeight: 700,
                labels: { colors: headerSelector.currentTheme.plainTextColor },
                itemMargin: { horizontal: 5 },
              },
              tooltip: {
                theme: "dark",
                x: {
                  formatter: (val) => {
                    return languageSelector.currentLanguage === "en"
                      ? "Added Date : " + moment(val).format("YYYY/MMM/DD")
                      : "تاریخ اضافه شده : " +
                          FormatHelper.toPersianString(
                            jmoment(val).format("jYYYY/jMMM/DD")
                          );
                  },
                },
                y: {
                  formatter: (val) => {
                    return languageSelector.currentLanguage === "en"
                      ? val + " dollor"
                      : FormatHelper.toPersianString(val + " دلار");
                  },
                },
                style: {
                  fontFamily:
                    languageSelector.currentLanguage === "en"
                      ? "Roboto Condensed"
                      : "Vazirmatn",
                },
              },
              dataLabels: {
                style: {
                  fontFamily:
                    languageSelector.currentLanguage === "en"
                      ? "Roboto Condensed"
                      : "Vazirmatn",
                  fontSize: "10px",
                },
              },
            }}
            type="bar"
            height={500}
          />
        </motion.div>
      )} */}

      {displayContent && <ProductsTable />}
    </motion.div>
  );
};

export default PurchaseManageMent;
