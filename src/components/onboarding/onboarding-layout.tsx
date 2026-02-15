
import { useOnboardingStore } from "@/store/onboarding-store";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { StepIdentity } from "./steps/step-identity";
import { StepRoleDetails } from "./steps/step-role-details";
import { StepInterests } from "./steps/step-interests";
import { StepProfileUpload } from "./steps/step-profile-upload";
import { StepSuccess } from "./steps/step-success";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

export function OnboardingLayout() {
    const { currentStep, prevStep, nextStep } = useOnboardingStore();

    const prevStepRef = useRef(currentStep);
    const direction = currentStep > prevStepRef.current ? 1 : -1;

    useEffect(() => {
        prevStepRef.current = currentStep;
    }, [currentStep]);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepIdentity />;
            case 2:
                return <StepRoleDetails />;
            case 3:
                return <StepInterests />;
            case 4:
                return <StepProfileUpload />;
            case 5:
                return <StepSuccess />;
            default:
                return <StepIdentity />;
        }
    };

    const showBackButton = currentStep > 1 && currentStep < 5;

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border md:min-h-[600px]">

            <div className="w-full flex items-center justify-between mb-8">
                <div className="">
                    {showBackButton && (
                        <Button variant="outline" size="icon" onClick={prevStep}>
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    )}
                </div>

                {currentStep < 5 && (
                    <Stepper currentStep={currentStep} totalSteps={4} />
                )}

                <div className="">
                    {currentStep === 4 ? (
                        <Button variant="ghost" onClick={() => nextStep()} className="text-primary flex items-end justify-end gap-1 ">Skip</Button>
                    ) : null}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="w-full h-full"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
