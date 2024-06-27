import { create } from "zustand";

const useLoadingStore = create((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading: isLoading }),
    getCurrentLoading: () => useLoadingStore.getState().isLoading,
    }));

export default useLoadingStore;