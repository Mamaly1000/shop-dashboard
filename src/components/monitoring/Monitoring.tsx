import ReactApexChart from "react-apexcharts";
import {
  btc_chart_data,
  dogecoin,
  eth_chart_data,
  solana_chart_data,
} from "../../dummy/charts";
import moment from "moment";
import jmoment from "moment-jalaali";
import FormatHelper from "../../utils/formatHelper";
import { small_box_motion } from "../../motions/dashboardMotions";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../features/languages/language_slice";
import { useTranslation } from "react-i18next";
import {
  dateIcon,
  userIcon,
  tickIcon,
  purchaseIcon,
} from "../../assets/icons/icons";
import { selectHeader } from "../../features/header/header_slice";
const pics = [tickIcon, userIcon, dateIcon, purchaseIcon];
const Monitoring = () => {
  const languageSelector = useSelector(selectLanguage);
  const headerSelector = useSelector(selectHeader);
  const { t } = useTranslation();
  const overallData: { title: string; value: string }[] = t(
    "monitoring.overall_data",
    { returnObjects: true }
  );
  return (
    <div className="monitoring-section">
      <motion.h1
        variants={small_box_motion(0.5, 0.1)}
        initial="hidden"
        whileInView="visible"
        className="section-header"
        style={{ color: headerSelector.currentTheme.headerColor }}
      >
        {t("monitoring.title")}
      </motion.h1>
      <motion.div
        variants={small_box_motion(0.5, 0.5)}
        initial="hidden"
        whileInView="visible"
        className="box over-all-data"
        style={{ background: headerSelector.currentTheme.darkColor }}
      >
        {overallData.map((data, index) => {
          return (
            <motion.div
              variants={small_box_motion(0.3, index / 2 + 0.3)}
              initial="hidden"
              whileInView="visible"
              key={index}
              className="overall-box"
              style={{
                color: headerSelector.currentTheme.plainTextColor,
                background: headerSelector.currentTheme.btnColor,
              }}
            >
              <img src={pics[index]} />
              {data.title} :{" "}
              {languageSelector.currentLanguage === "en"
                ? data.value
                : FormatHelper.toPersianString(data.value)}
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        className="small-box"
        variants={small_box_motion(0.5, 0.5)}
        initial="hidden"
        whileInView="visible"
        style={{ background: headerSelector.currentTheme.darkColor }}
      >
        <ReactApexChart
          options={{
            chart: {
              type: "area",
              stacked: true,
              height: 190,
              sparkline: {
                enabled: true,
              },
              animations: {
                enabled: true,
                speed: 2000,
              },
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
            },
            title: {
              text:
                languageSelector.currentLanguage === "en"
                  ? "Total profit last month"
                  : "سود کلی ماه گذشته  ",
              align:
                languageSelector.currentLanguage === "en" ? "left" : "center",
              style: {
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
                color: headerSelector.currentTheme.headerColor,
                fontSize: "1rem",
              },
              offsetY: 25,
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
              },
            },
            yaxis: {
              title: {
                text: "Price",
              },
              show: false,
            },
            xaxis: {
              categories: eth_chart_data.total_volumes.map((coin) => {
                let date = new Date(coin[0]);
                return moment(date).format("YYYY/MM/DD");
              }),
              type: "datetime",
            },
            tooltip: {
              shared: false,
              theme: "dark",
              y: {
                formatter: function (val: number) {
                  return languageSelector.currentLanguage === "fa"
                    ? `${FormatHelper.toPersianString(
                        val.toLocaleString()
                      )} دلار`
                    : `${val.toLocaleString()} dollor`;
                },
              },
              x: {
                formatter: (val: number, _opts: any) => {
                  return languageSelector.currentLanguage === "en"
                    ? moment(val).format("YYYY-MMMM-DD")
                    : FormatHelper.toPersianString(
                        jmoment(val).format("jYYYY-jMMMM-jDD")
                      );
                },
              },
              style: {
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
              },
            },
            stroke: {
              width: 1,
              curve: "straight",
              lineCap: "round",
            },
          }}
          series={[
            {
              name:
                languageSelector.currentLanguage === "en"
                  ? "total amounts"
                  : "مجموع کل",
              data: eth_chart_data.total_volumes.map((coin) => coin[1]),
              color: headerSelector.currentTheme.headerColor,
            },
          ]}
          type="area"
          height={190}
        />
      </motion.div>
      <motion.div
        className="small-box"
        variants={small_box_motion(0.5, 0.8)}
        initial="hidden"
        whileInView="visible"
        style={{ background: headerSelector.currentTheme.darkColor }}
      >
        <ReactApexChart
          options={{
            chart: {
              type: "area",
              stacked: true,
              height: 190,
              sparkline: {
                enabled: true,
              },
              animations: {
                enabled: true,
                speed: 2000,
              },
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
            },
            title: {
              text:
                languageSelector.currentLanguage === "en"
                  ? "Last month's total sales"
                  : "فروش کلی ماه گذشته",
              align:
                languageSelector.currentLanguage === "en" ? "left" : "center",
              style: {
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
                color: headerSelector.currentTheme.headerColor,
                fontSize: "1rem",
              },
              offsetY: 25,
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
              },
            },
            yaxis: {
              title: {
                text: "Price",
              },
              show: false,
            },
            xaxis: {
              categories: dogecoin.total_volumes.map((coin) => {
                let date = new Date(coin[0]);
                return moment(date).format("YYYY/MM/DD");
              }),
              type: "datetime",
            },
            tooltip: {
              shared: false,
              theme: "dark",
              y: {
                formatter: function (val: number) {
                  return languageSelector.currentLanguage === "fa"
                    ? `${FormatHelper.toPersianString(
                        (val / 10000000).toLocaleString()
                      )} دلار`
                    : `${(val / 100000000).toLocaleString()} dollor`;
                },
              },
              x: {
                formatter: (val: number, _opts: any) => {
                  return languageSelector.currentLanguage === "en"
                    ? moment(val).format("YYYY-MMMM-DD")
                    : FormatHelper.toPersianString(
                        jmoment(val).format("jYYYY-jMMMM-jDD")
                      );
                },
              },
              style: {
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
              },
            },
            stroke: {
              width: 1,
              curve: "straight",
              lineCap: "square",
            },
          }}
          series={[
            {
              name:
                languageSelector.currentLanguage === "en"
                  ? "total amounts"
                  : "مجموع کل",
              data: dogecoin.total_volumes.map((coin) => coin[1]),
              color: headerSelector.currentTheme.headerColor,
            },
          ]}
          type="area"
          height={190}
        />
      </motion.div>
      <motion.div
        className="small-box"
        variants={small_box_motion(0.5, 1)}
        initial="hidden"
        whileInView="visible"
        style={{ background: headerSelector.currentTheme.darkColor }}
      >
        <ReactApexChart
          options={{
            chart: {
              type: "area",
              stacked: true,
              animations: {
                enabled: true,
                speed: 2000,
              },
              height: 190,
              sparkline: {
                enabled: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
            },
            title: {
              text:
                languageSelector.currentLanguage === "en"
                  ? "Users added in the last month"
                  : "کاربران اضافه شده در ماه گذشته   ",
              align:
                languageSelector.currentLanguage === "en" ? "left" : "center",
              style: {
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
                color: headerSelector.currentTheme.headerColor,
                fontSize: "1rem",
              },
              offsetY: 25,
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
              },
            },
            yaxis: {
              title: {
                text: "Price",
              },
              show: false,
            },
            xaxis: {
              categories: btc_chart_data.prices.slice(0, 100).map((coin) => {
                let date = new Date(coin[0]);
                return moment(date).format("YYYY/MM/DD");
              }),
              type: "datetime",
            },
            tooltip: {
              shared: false,
              theme: "dark",
              y: {
                formatter: function (val: number) {
                  return languageSelector.currentLanguage === "fa"
                    ? `${FormatHelper.toPersianString(
                        val.toLocaleString()
                      )} کاربر`
                    : `${val.toLocaleString()} user`;
                },
              },
              x: {
                formatter: (val: number, _opts: any) => {
                  return languageSelector.currentLanguage === "en"
                    ? moment(val).format("YYYY-MMMM-DD")
                    : FormatHelper.toPersianString(
                        jmoment(val).format("jYYYY-jMMMM-jDD")
                      );
                },
              },
              style: {
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
              },
            },
            stroke: {
              width: 1,
              curve: "smooth",
              lineCap: "square",
            },
          }}
          series={[
            {
              name:
                languageSelector.currentLanguage === "en"
                  ? "total users"
                  : "مجموع کاربران",
              data: [
                523, 423, 723, 556, 765, 764, 466, 435, 324, 524, 445, 434, 646,
                854, 634, 345, 445, 434, 905, 345, 434, 534, 445, 435, 634, 534,
                445, 345, 635, 234, 523, 423, 723, 556, 765, 764, 466, 435, 324,
                524, 445, 434, 646, 854, 634, 345, 445, 434, 905, 345, 434, 534,
                445, 435, 634, 534, 445, 345, 635, 234, 523, 423, 723, 556, 765,
                764, 466, 435, 324, 524, 445, 434, 646, 854, 634, 345, 445, 434,
                905, 345, 434, 534, 445, 435, 634, 534, 445, 345, 635, 234, 434,
                534, 445, 435, 634, 534, 445, 345, 635, 234,
              ],
              color: headerSelector.currentTheme.headerColor,
            },
          ]}
          type="area"
          height={190}
        />
      </motion.div>
      <motion.div
        variants={small_box_motion(0.5, 1.5)}
        initial="hidden"
        whileInView="visible"
        className="box"
        style={{ background: headerSelector.currentTheme.darkColor }}
      >
        <ReactApexChart
          options={{
            chart: {
              type: "area",
              stacked: true,
              height: 350,
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
              },
              toolbar: {
                autoSelected: "zoom",
              },
              animations: {
                enabled: true,
                speed: 2000,
              },
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0.1,
              colors: [headerSelector.currentTheme.headerColor],
            },
            title: {
              text:
                languageSelector.currentLanguage === "en"
                  ? "Amounts spent last month"
                  : "مبالغ هزینه شده در ماه گذشته ",
              align: "center",
              style: {
                color: headerSelector.currentTheme.headerColor,
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
              },
              offsetY: 10,
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
              },
            },
            yaxis: {
              title: {
                text: "Price",
              },
              axisBorder: {
                show: false,
                width: 0,
                color: "white",
              },
              crosshairs: { show: false },
              axisTicks: {
                show: false,
              },
              show: false,
            },
            xaxis: {
              categories: solana_chart_data.prices.map((coin) => {
                let date = new Date(coin[0]);
                return moment(date).format("YYYY/MM/DD");
              }),
              type: "datetime",
              axisBorder: {
                color: "rgba(255 255 255/.1)",
                strokeWidth: 0.1,
              },
              labels: {
                style: {
                  colors: headerSelector.currentTheme.headerColor,
                  fontFamily:
                    languageSelector.currentLanguage === "en"
                      ? "Roboto Condensed"
                      : "Vazirmatn",
                },
                formatter: (value) => {
                  return languageSelector.currentLanguage === "en"
                    ? moment(value).format("MMM-DD")
                    : FormatHelper.toPersianString(
                        jmoment(value).format("jMMMM-jDD")
                      );
                },
              },
            },
            tooltip: {
              shared: false,
              theme: "dark",
              y: {
                formatter: function (val: number) {
                  return languageSelector.currentLanguage === "fa"
                    ? `${FormatHelper.toPersianString(
                        (val / 10000000).toLocaleString()
                      )} دلار`
                    : `${(val / 100000000).toLocaleString()} dollor`;
                },
              },
              x: {
                formatter: (val: number, _opts: any) => {
                  return languageSelector.currentLanguage === "en"
                    ? moment(val).format("YYYY-MMMM-DD")
                    : FormatHelper.toPersianString(
                        jmoment(val).format("jYYYY-jMMMM-jDD")
                      );
                },
              },
              style: {
                fontFamily:
                  languageSelector.currentLanguage === "en"
                    ? "Roboto Condensed"
                    : "Vazirmatn",
              },
            },
            grid: {
              borderColor: "rgba(255 255 255 /.1)",
              strokeDashArray: 1,
            },
          }}
          series={[
            {
              name:
                languageSelector.currentLanguage === "en"
                  ? "Total Amount"
                  : "مبلغ کل",
              data: solana_chart_data.prices.map((coin) => coin[1]),
              color: headerSelector.currentTheme.headerColor,
            },
          ]}
          type="area"
          height={350}
        />
      </motion.div>
    </div>
  );
};

export default Monitoring;
