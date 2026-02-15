import { create } from 'zustand'
import { type User } from '../config/types'

interface AuthStore {
    user: User | null;
    setUser: (user: User) => void;
    removeUser: () => void;
}

const useAuth = create<AuthStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    removeUser: () => set({ user: null }),
}))

export default useAuth
