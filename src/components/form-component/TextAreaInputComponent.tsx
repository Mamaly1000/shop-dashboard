import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const TextAreaInputComponent = ({
  icon,
  value,
  onchange,
  label,
}: {
  icon: string;
  value: string;
  onchange: (e: any) => void;
  label: string;
}) => {
  const [require, setRequire] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (value.length > 0) {
      setRequire(false);
    }
  }, [value]);
  return (
    <div className="input-group">
      <span className="label-container">
        <img src={icon} />
        <label htmlFor={label}>{label} :</label>
      </span>
      <textarea
        value={value}
        onChange={onchange}
        maxLength={1000}
        autoSave="true"
        onFocus={() => {
          if (value.length === 0) {
            setRequire(true);
          }
        }}
        onBlur={() => {
          if (value.length === 0) {
            setRequire(true);
          }
        }}
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

export default TextAreaInputComponent;
