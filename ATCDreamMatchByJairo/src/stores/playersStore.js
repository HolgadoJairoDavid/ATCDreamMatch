import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlayersStore = create(persist(
    (set, get) => ({
        players: [],
        playersFiltered: [],
        filterType: '',
        orderBy: '', 
        setFilterType: (value) => set({ filterType: value }),
        setOrderBy: (value) => set({ orderBy: value }),
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
            
              set({ playersFiltered: get().orderBy === 'Ascendent' ? filteredPlayers.sort((a, b) => a.player_name.localeCompare(b.player_name)) : filteredPlayers.sort((a, b) => b.player_name.localeCompare(a.player_name))});
        },
        setPlayersOrderBy: (value) => {
            if (!value) {
                set({ playersFiltered: get().playersFiltered });
                return;
            }
            const orderedPlayers = value === "Ascendent" ? get().playersFiltered.sort((a, b) => a.player_name.localeCompare(b.player_name)) : get().playersFiltered.sort((a, b) => b.player_name.localeCompare(a.player_name));
            set({ playersFiltered: orderedPlayers });
        }
    
    }),
        {
            name: 'players-store',
        }
));

export default usePlayersStore;