// store/useStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface StoreState {
  token: string | null;
  user: any | null;
  companyInfo: any | null;
  categoryList: unknown | null;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  setCompanyInfo: (companyInfo: any) => void;
  setCategories: (categoryList: any) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      companyInfo: null,
      categoryList: null,
      setToken: (token: string) => set({ token }),
      setUser: (user: any) => set({ user }),
      setCompanyInfo: (companyInfo: any) => set({ companyInfo }),
      setCategories: (categoryList: object) => set({ categoryList }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
