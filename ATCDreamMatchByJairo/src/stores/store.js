import {create} from 'zustand';

const useTeamsStore = create((set) => ({
    teams: [],
    setTeams: (teams) => set({ teams: teams }),
    removeAllTeams: () => set({ teams: [] }),
    addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
  }))

export default useTeamsStore;