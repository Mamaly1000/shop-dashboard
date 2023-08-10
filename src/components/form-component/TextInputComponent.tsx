import React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

const TextInputComponent = ({
  label,
  input_type,
  onchange,
  icon,
  value,
}: {
  label: string;
  input_type: React.HTMLInputTypeAttribute;
  icon: string;
  value: string | number;
  onchange: (e: any) => void;
}) => {
  const [require, setRequire] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (input_type === "text" && (value + "").length > 0) {
      setRequire(false);
    }
    if (input_type === "number" && +value > 0) {
      setRequire(false);
    }
  }, [value]);
  return (
    <div className="input-group">
      <span className="label-container">
        <img src={icon} />
        <label htmlFor={label}>{label} :</label>
      </span>
      <input
        onFocus={() => {
          if (input_type === "text" && (value + "").length === 0) {
            setRequire(true);
          }
          if (input_type === "number" && +value === 0) {
            setRequire(true);
          }
        }}
        type={input_type}
        value={value}
        id={label}
        onChange={onchange}
        onBlur={() => {
          if (input_type === "text" && (value + "").length === 0) {
            setRequire(true);
          }
          if (input_type === "number" && +value === 0) {
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

export default TextInputComponent;
