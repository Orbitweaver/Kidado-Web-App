import type { User } from "@/config/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IUserStore {
  accessToken: string;
  refreshToken: string;
  user: User | null;
  setUser: (accessToken: string, refreshToken: string, user: User) => void;
  clearUser: () => void;
}

const userStore = (
  set: (
    partial: Partial<IUserStore> | ((state: IUserStore) => Partial<IUserStore>),
  ) => void,
): IUserStore => ({
  accessToken: "",
  refreshToken: "",
  user: null,
  setUser: (accessToken: string, refreshToken: string, user: User) =>
    set({
      accessToken,
      refreshToken,
      user,
    }),
  clearUser: () => set({ accessToken: "", refreshToken: "", user: null }),
});

const useUserStore = create(
  persist<IUserStore>(userStore, {
    name: "user-storage",
    storage: createJSONStorage(() => localStorage),
  }),
);

export default useUserStore;
