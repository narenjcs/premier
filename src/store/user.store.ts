import { create } from 'zustand'

interface UserStore {
    user:any,
    setUser: (user: any) => void,
    clearUser: () => void}

export const useUserStore = create<UserStore>((set) => ({
  user: {},
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: {} }),
}))