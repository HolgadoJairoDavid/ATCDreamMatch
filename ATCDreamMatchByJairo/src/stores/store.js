import {create} from 'zustand';

const useTeamsStore = create((set) => ({
    teams: [],
    playersSearch: [],
    addTeamIsOpen: false,
    teamCurrent: {
        name: '',
        players: []
    },
    setTeams: (teams) => set({ teams: teams }),
    removeAllTeams: () => set({ teams: [] }),
    addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
    removeTeam: (team) => set((state) => ({ teams: state.teams.filter((t) => t !== team) })),
    openAddTeam: () => set({ addTeamIsOpen: true }),
    closeAddTeam: () => set({ addTeamIsOpen: false }),
    setPlayersSearch: (players) => set({ playersSearch: players }),
    removeAllPlayersSearch: () => set({ playersSearch: [] }),
    addPlayer: (player) => set((state) => ({ playersSearch: [...state.playersSearch, player] })),
    removePlayer: (player) => set((state) => ({ playersSearch: state.playersSearch.filter((p) => p !== player) })),
    setTeamCurrent: (team) => set({ teamCurrent: team }),
    removeTeamCurrent: () => set({ teamCurrent: {
        name: '',
        players: []
    } }),
  }))

export default useTeamsStore;