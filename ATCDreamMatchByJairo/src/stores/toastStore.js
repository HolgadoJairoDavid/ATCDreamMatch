import { create } from "zustand";

const useToastStore = create((set) => ({
    toast: false,
    setToast: (value) => set({ toast: value}),
    }));

export default useToastStore;