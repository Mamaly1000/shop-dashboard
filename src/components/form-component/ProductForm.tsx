import React from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import FinalStep from "./FinalStep";
import { AnimatePresence } from "framer-motion";

export type firststep = {
  type: "FIRST";
  id: number;
  name: string;
  buyer: string;
  company: string;
  persianName: string;
};
export type secondStep = {
  type: "SECOND";
  category: { en: string; fa: string };
  addedDate: number | string;
  expireDate: number | string;
};
export type thirdStep = {
  type: "THIRD";
  description: string;
  persiandesc: string;
  price: number;
  isActive: boolean;
  totalSupply: number;
};
const ProductForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <AnimatePresence>
        {step === 1 && <StepOne step={step} setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>
        {step === 2 && <StepTwo step={step} setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>
        {step === 3 && <StepThree step={step} setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>
        {step === 4 && <FinalStep step={step} setStep={setStep} />}
      </AnimatePresence>
    </div>
  );
};

export default ProductForm;
