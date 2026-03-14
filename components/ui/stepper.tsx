import React, { useState, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

export type StepProps = {
  label: string;
  content: ReactNode;
  onTap: () => void;
};
const StepIndicator: React.FC<{ currentStep: number; steps: StepProps[] }> = ({
  currentStep,
  steps,
}) => (
  <div className="flex justify-between">
    {steps.map((step, index) => (
      <div key={step.label} className="flex flex-col items-center">
        <motion.div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${index <= currentStep ? "bg-red-500/15 text-red-500" : "bg-secondary"
            }`}
          initial={false}
          animate={{ scale: index === currentStep ? 1.2 : 1 }}
        >
          {index <= currentStep ? (
            <CheckCircle size={20} />
          ) : (
            <Circle size={20} />
          )}
        </motion.div>
        <div className="mt-2 text-sm">{step.label}</div>
      </div>
    ))}
  </div>
);

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => (
  <motion.div
    className="mt-4 h-2 rounded-full bg-red-500"
    initial={{ width: "0%" }}
    animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
  />
);

const StepContent = ({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="my-4 flex flex-col min-h-[30vh] w-full items-center justify-center rounded-3xl border bg-gray-100  text-center">
      {content}
      <div className="my-5 w-full">{children}</div>
    </div>
  );
};

const ButtonClasses =
  "rounded-2xl bg-red-500 px-2 py-1 text-sm font-medium text-white flex-1 w-full";

const NavigationButtons: React.FC<{
  currentStep: number;
  totalSteps: number;
  handlePrev: () => void;
  handleNext: () => void;
}> = ({ currentStep, totalSteps, handlePrev, handleNext }) => (
  <div className="flex w-full gap-3">
    {currentStep === 0 ? null : (
      <button onClick={handlePrev} className={ButtonClasses}>
        Previous
      </button>
    )}
    {currentStep === totalSteps - 1 ? null : (
      <button onClick={handleNext} className={ButtonClasses}>
        Next
      </button>
    )}
  </div>
);

const Stepper = ({ steps }: { steps: StepProps[] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <StepIndicator currentStep={currentStep} steps={steps} />
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      <StepContent content={steps[currentStep].content}>
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={steps.length}
          handlePrev={handlePrev}
          handleNext={() => {
            handleNext();
            steps[currentStep].onTap();
          }}
        />
      </StepContent>
    </div>
  );
};

export default Stepper;
