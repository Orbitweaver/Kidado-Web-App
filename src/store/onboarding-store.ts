import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OnboardingData {
  fullName: string;
  role: string;
  school: string;
  location: string;
  interests: string[];
  bio: string;
  profileImage: string | null; // Storing as base64 or URL for simplicity in this demo, real app might upload immediately
}

interface OnboardingState extends OnboardingData {
  currentStep: number;
  totalSteps: number;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
  reset: () => void;
}

const INITIAL_DATA: OnboardingData = {
  fullName: "",
  role: "",
  school: "",
  location: "",
  interests: [],
  bio: "",
  profileImage: null,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...INITIAL_DATA,
      currentStep: 1,
      totalSteps: 5,

      setStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      updateData: (data) => set((state) => ({ ...state, ...data })),

      reset: () => set({ ...INITIAL_DATA, currentStep: 1 }),
    }),
    {
      name: "onboarding-storage",
      partialize: (state) => ({
        // Persist everything except maybe large files if we were doing that
        fullName: state.fullName,
        role: state.role,
        school: state.school,
        location: state.location,
        interests: state.interests,
        bio: state.bio,
        currentStep: state.currentStep,
      }),
    },
  ),
);
