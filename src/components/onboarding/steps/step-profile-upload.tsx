
import { useState } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";

export function StepProfileUpload() {
    const { bio, profileImage, updateData, nextStep, fullName, role, school, location } = useOnboardingStore();
    const [localBio, setLocalBio] = useState(bio || "");

    const handleImageChange = (file: File | null) => {
        if (file) {
            const url = URL.createObjectURL(file);
            updateData({ profileImage: url });
        }
    };

    const handleContinue = () => {
        updateData({ bio: localBio });
        nextStep();
    };

    return (
        <div className="space-y-6 text-center">

            <div className="space-y-2 -mt-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Upload Profile
                </h2>
                <p className="text-sm text-muted-foreground">
                    Please Upload your Profile Photo
                </p>
            </div>

            <div className="">
                <FileUpload
                    value={profileImage}
                    onChange={handleImageChange}
                />

                <div className="mt-4 text-sm text-gray-500">
                    <div>{fullName} | {role}</div>
                    <div>{school} . {location}</div>
                </div>
            </div>

            <div className="max-w-sm mx-auto space-y-4 text-left">
                <div className="space-y-2">
                    <Label htmlFor="bio" className="sr-only">Bio</Label>
                    <Textarea
                        id="bio"
                        placeholder="Write about yourself (Optional)"
                        className="resize-none h-24"
                        value={localBio}
                        onChange={(e) => setLocalBio(e.target.value)}
                    />
                </div>

                <Button onClick={handleContinue} className="w-full">
                    Continue
                </Button>
            </div>
        </div>
    );
}
