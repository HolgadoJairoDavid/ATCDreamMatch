import style from './searchBar.module.css';
import ClientService from '../../services/ClientService';
import useTeamsStore from '../../stores/store';

const SearchBar = () => {
    const { setPlayersSearch } = useTeamsStore(state => state);
    const handleSearch = async (e) => {
        const name = e.target.value;
        if (name.trim().length < 3) {
            setPlayersSearch([]);
            return;
        }
        try {
            let response = await ClientService.searchPlayers(name);
            if (response.data.error) {
                console.error(response.data.error);
                return;
            }
            setPlayersSearch(response.data.slice(0, 30).map((player) => ({
                    player_id: player.player_id,
                    player_name: player.player_name,
                    player_type: player.player_type
            })));
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={style.SearchBar}>
        <input
            type="text"
            onChange={handleSearch}
            placeholder="Buscar"
        />
        </div>
    );
};

export default SearchBar;