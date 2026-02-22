import { useState } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { Loader2 } from "lucide-react";
import { normalizeDrfError } from "@/lib/normalizeErrors";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export function StepProfileUpload() {
  const {
    bio,
    profileImage,
    updateData,
    fullName,
    role,
    school,
    location,
    interests,
    reset,
  } = useOnboardingStore();
  const [localBio, setLocalBio] = useState(bio || "");
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const handleImageChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      updateData({ profileImage: url });
    }
  };

  const handleContinue = async () => {
    updateData({ bio: localBio });

    try {
      await updateProfile({
        name: fullName,
        bio: localBio,
        institution: school,
        city: location,
        interests: interests,
        profile_image: profileImage || undefined,
      });
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        const apiError = normalizeDrfError(
          error.response?.data || { message: "An unexpected error occurred." },
        );

        toast.error(apiError.message);
      }
    }
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
        <FileUpload value={profileImage} onChange={handleImageChange} />

        <div className="mt-4 text-sm text-gray-500">
          <div>
            {fullName} | {role}
          </div>
          <div>
            {school} . {location}
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto space-y-4 text-left">
        <div className="space-y-2">
          <Label htmlFor="bio" className="sr-only">
            Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Write about yourself (Optional)"
            className="resize-none h-24"
            value={localBio}
            onChange={(e) => setLocalBio(e.target.value)}
          />
        </div>

        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
