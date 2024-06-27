import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlayersStore = create(persist(
    (set, get) => ({
        players: [],
        playersFiltered: [],
        filterType: '',
        setFilterType: (value) => set({ filterType: value }),
        setPlayers: (players) => {
            set({ players });
                if (get().filterType !== '' && get().filterType !== 'All') { 
                    set({ playersFiltered: players.filter(p => p.player_type === get().filterType) });
                } else {
                    set({ playersFiltered: players }); 
                }
        },
        setPlayersFiltered: (value) => {
    
            if (!value) {
                set({ playersFiltered: get().players });
                return;
            }
    
            const typeFilters = {
                Goalkeepers: 'Goalkeepers',
                Defenders: 'Defenders',
                Midfielders: 'Midfielders',
                Forwards: 'Forwards',
                Coach: 'Coach',
              };
          
              const filterType = typeFilters[value];
          
              if (!filterType && value !== undefined && value !== "All") {
                console.warn(`Invalid player type: ${value}`); 
              }
          
              const filteredPlayers = filterType
                ? get().players.filter(p => p.player_type === filterType)
                : get().players;
              set({ playersFiltered: filteredPlayers });
        },
        }),
        {
            name: 'players-store',
        }
));

export default usePlayersStore;