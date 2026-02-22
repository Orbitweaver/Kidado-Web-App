import Success from "@/components/svgs/success";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useOnboardingStore } from "@/store/onboarding-store";

export function StepSuccess() {
  const navigate = useNavigate();
  const { reset } = useOnboardingStore();

  const handleStart = () => {
    reset();
    navigate("/");
  };

  return (
    <div className="space-y-6 text-center py-10">
      <div className="flex justify-center">
        <Success />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-medium tracking-tight">
          Account created successfully!
        </h2>
        <p className="text-md text-gray-400">
          Welcome aboard! Start your success journey with Kidado!
        </p>
      </div>

      <div className="pt-8">
        <Button onClick={handleStart} className="min-w-50 ">
          Let's Start!
        </Button>
      </div>
    </div>
  );
}
