import { create } from "zustand";

const usePaginateStore = create((set) => ({
    currentPage: 1,
    playersPerPage: 10,
    setCurrentPage: (pageNumber) => set({ currentPage: pageNumber }),
}));

export default usePaginateStore;