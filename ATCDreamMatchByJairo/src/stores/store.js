import {create} from 'zustand';

const useTeamsStore = create((set) => ({
    bears: 23,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
  }))

export default useTeamsStore;