import {create} from 'zustand';

const useTeamsStore = create((set) => ({
    teams: [],
    addTeamIsOpen: false,
    setTeams: (teams) => set({ teams: teams }),
    removeAllTeams: () => set({ teams: [] }),
    addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
    removeTeam: (team) => set((state) => ({ teams: state.teams.filter((t) => t !== team) })),
    openAddTeam: () => set({ addTeamIsOpen: true }),
    closeAddTeam: () => set({ addTeamIsOpen: false }),
  }))

export default useTeamsStore;