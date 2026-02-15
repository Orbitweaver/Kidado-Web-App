import Logo from "@/components/svgs/logo";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";

const OnboardingPage = () => {
    return (
        <div className="min-h-screen w-screen bg-[#F4F5FF] p-4 md:p-10 flex flex-col">
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-center mb-4 md:justify-start">
                    <Logo />
                </div>

                <div className="flex-1 flex items-center justify-center pb-10">
                    <OnboardingLayout />
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
