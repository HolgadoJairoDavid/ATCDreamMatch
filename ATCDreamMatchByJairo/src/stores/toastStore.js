import { create } from "zustand";

const useToastStore = create((set) => ({
    toast: false,
    showConfetti: false,
    setShowConfetti: (value) => set({ showConfetti: value}),
    setToast: (value) => set({ toast: value}),
    }));

export default useToastStore;