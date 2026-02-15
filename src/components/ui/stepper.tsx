
import { cn } from "@/lib/utils";

interface StepperProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
}

export function     Stepper({ currentStep, totalSteps, className }: StepperProps) {
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const step = index + 1;
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;

                return (
                    <div key={step} className="flex items-center">
                        <div
                            className={cn(
                                "h-2 w-2 rounded-full transition-all duration-300",
                                isActive ? "bg-primary w-8" : isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                            )}
                        />
                    </div>
                );
            })}
        </div>
    );
}
