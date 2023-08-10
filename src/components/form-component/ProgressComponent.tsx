import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { tickIcon } from "../../assets/icons/icons";
import { useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";

const ProgressComponent = ({ step }: { step: number }) => {
  const [progress, setProgress] = useState(23);
  const { currentTheme } = useSelector(selectHeader);
  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (progress / 100) * circumference;
  useEffect(() => {
    if (step === 1) {
      setProgress(23);
    } else if (step === 2) {
      setProgress(46);
    } else if (step === 3) {
      setProgress(67.5);
    } else if (step === 4) {
      setProgress(100);
    }
  }, [step]);
  const { t } = useTranslation();
  const steps: string[] = t("steps", { returnObjects: true });
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{
        duration: 0.2,
        typ: "tween",
      }}
      className="progress-container"
    >
      {steps.map((data, index) => {
        return (
          <motion.span
            key={index}
            style={{
              background: currentTheme.darkColor,
              color: currentTheme.plainTextColor,
            }}
            className={`${"step-" + (index + 1)}`}
          >
            {data}
            <AnimatePresence>
              {step > index + 1 && (
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{
                    duration: 0.2,
                    type: "tween",
                  }}
                  src={tickIcon}
                />
              )}
            </AnimatePresence>
          </motion.span>
        );
      })}
      <motion.svg className="progress-slider" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={currentTheme.btnColor}
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1 }}
        />{" "}
      </motion.svg>
    </motion.div>
  );
};

export default ProgressComponent;
