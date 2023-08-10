import { DatePicker } from "react-advance-jalaali-datepicker";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../features/languages/language_slice";
import { useEffect, useState } from "react";
import FormatHelper from "../../utils/formatHelper";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const DateInputComponent = ({
  value,
  onchange,
  icon,
  label,
}: {
  value: string;
  onchange: (e: any, formatted: any) => void;
  icon: string;
  label: string;
}) => {
  const { currentLanguage: lang } = useSelector(selectLanguage);
  const DatePickerInput = (props: any) => {
    return <input style={{ color: "#ffffff" }} {...props} />;
  };
  const [require, setRequire] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    if (value !== "") {
      setRequire(false);
    }
  }, [value]);
  return (
    <div className="input-group date-input">
      <span className="label-container">
        <img src={icon} />
        <label htmlFor={label}>{label} :</label>
      </span>
      <DatePicker
        inputComponent={DatePickerInput}
        id={label}
        controlValue={true}
        preSelected={
          lang === "en" ? value : FormatHelper.toPersianString(value)
        }
        onChange={onchange}
        format={lang === "en" ? "YYYY/MM/DD" : "jYYYY/MM/jDD"}
        placeholder={lang === "en" ? "year / month / day" : "سال / ماه / روز"}
        customClass="calander"
      />
      <AnimatePresence>
        {require && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.1, type: "tween" }}
            className="require"
          >
            {t("create_procuct_form.reqire")}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateInputComponent;
