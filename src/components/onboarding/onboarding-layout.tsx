
import { useOnboardingStore } from "@/store/onboarding-store";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { StepIdentity } from "./steps/step-identity";
import { StepRoleDetails } from "./steps/step-role-details";
import { StepInterests } from "./steps/step-interests";
import { StepProfileUpload } from "./steps/step-profile-upload";
import { StepSuccess } from "./steps/step-success";

export function OnboardingLayout() {
    const { currentStep, prevStep, nextStep } = useOnboardingStore();

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
                {renderStep()}
            </div>
        </div>
    );
}
