
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

const INTERESTS = [
    "Robotics",
    "Frontend Development",
    "Digital Marketing",
    "Agentic AI",
    "Science",
    "Technology",
    "Space Agency",
    "Artificial Intelligence",
    "Web Development",
    "Others",
];

import { useState } from "react";

export function StepInterests() {
    const { interests, updateData, nextStep } = useOnboardingStore();
    const [customParam, setCustomParam] = useState("");

    const isOtherSelected = interests.includes("Others");

    const customInterests = interests.filter(i => !INTERESTS.includes(i) && i !== "Others");

    const toggleInterest = (interest: string) => {
        if (interest === "Others") {
            if (isOtherSelected) {
                updateData({
                    interests: interests.filter(i => INTERESTS.includes(i) && i !== "Others")
                });
                setCustomParam("");
            } else {
                updateData({ interests: [...interests, "Others"] });
            }
        } else {
            if (interests.includes(interest)) {
                updateData({ interests: interests.filter((i) => i !== interest) });
            } else {
                updateData({ interests: [...interests, interest] });
            }
        }
    };

    const removeCustomInterest = (interestToRemove: string) => {
        updateData({
            interests: interests.filter(i => i !== interestToRemove)
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (customParam.trim()) {
                if (!interests.includes(customParam.trim())) {
                    updateData({ interests: [...interests, customParam.trim()] });
                }
                setCustomParam("");
            }
        }
    };

    return (
        <div className="space-y-6 text-center">
            <div className="space-y-2">
                <h2 className="text-2xl font-medium tracking-tight">
                    Select your interest
                </h2>
                <p className="text-sm text-muted-foreground">
                    A real profile helps you build meaningful connections and credibility.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {INTERESTS.map((interest) => {
                    const isSelected = interests.includes(interest);
                    return (
                        <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${isSelected
                                    ? "bg-accent text-primary border-accent border"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent border"
                                }
              `}
                        >
                            {isSelected && <span className="mr-2 text-primary">•</span>}
                            {interest}
                            {isSelected && <span className="ml-2 text-primary">×</span>}
                        </button>
                    );
                })}

                {/* Render Custom Interests as chips */}
                {customInterests.map((interest) => (
                    <button
                        key={interest}
                        onClick={() => removeCustomInterest(interest)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-accent text-primary border-accent border"
                    >
                        <span className="mr-2 text-primary">•</span>
                        {interest}
                        <span className="ml-2 text-primary">×</span>
                    </button>
                ))}
            </div>

            {isOtherSelected && (
                <div className="max-w-xs mx-auto animate-in fade-in slide-in-from-top-2 duration-300">
                    <Input
                        placeholder="Type and press Enter to add..."
                        value={customParam}
                        onChange={(e) => setCustomParam(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-left">
                        Press Enter to add multiple interests.
                    </p>
                </div>
            )}

            <div className="max-w-sm mx-auto pt-8">
                <Button
                    onClick={nextStep}
                    className="w-full"
                    disabled={interests.length === 0}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
