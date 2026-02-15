import Logo from "@/components/svgs/logo";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";

const OnboardingPage = () => {
    return (
        <div className="min-h-screen w-screen bg-[#F4F5FF] p-4 md:p-10 flex flex-col">
            <div className="mb-8 pl-4 md:pl-0">
                <Logo />
            </div>

            <div className="flex-1 flex items-center justify-center pb-10">
                <OnboardingLayout />
            </div>
        </div>
    );
};

export default OnboardingPage;
