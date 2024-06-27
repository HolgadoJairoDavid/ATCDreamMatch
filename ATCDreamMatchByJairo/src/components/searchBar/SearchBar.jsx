import style from './searchBar.module.css';
import { useState, useEffect } from 'react';
import ClientService from '../../services/ClientService';
import useLoadingStore from '../../stores/loadingStore';
import useSnackStore from '../../stores/snackStore';
import usePlayersStore from '../../stores/playersStore'
import { useDebounce } from '../../helpers/useDebounce';

const SearchBar = () => {
    const { setIsLoading } = useLoadingStore(state => state);
    const { setSnack } = useSnackStore(state => state);
    const { setPlayers, playersFiltered } = usePlayersStore(state => state);
    const [inputValue, setInputValue] = useState('');
    const debouncedSearch = useDebounce(inputValue, 300);
    
    useEffect( () => {
        if (inputValue.trim().length === 0) {
            setPlayers([]);
            return;
        }
        try {
            const request = async () => {
                let {data} = await ClientService.searchPlayers(inputValue);
            if (data.error) {
                setPlayers([]);
                if (data.error === 404) {
                    setSnack(true,'No se encontraron jugadores', 'warning');
                } else {
                    setSnack(true, 'Ocurrió un error, estamos trabajando para resolverlo','error');
                }

                setTimeout(() => {
                    setSnack(false, '', '');
                }, 3600);

                setIsLoading(false);
                return;
            }
            if (inputValue.trim().length > 0) {
                setPlayers(data.slice(0, 30).map((player) => ({
                    player_id: player.player_id,
                    player_name: player.player_name,
                    player_type: player.player_type
                })));
            }
            setIsLoading(false);
            } 
            if (inputValue.trim().length > 0) {
                request();
            }
        } catch (error) {
            console.error(error);
        }
    }, [debouncedSearch]);

    return (
        <div className={style.SearchBar}>
        <input
            type="text"
            onChange={(e)=> setInputValue(e.target.value)}
            placeholder="Buscar"
        />
        </div>
    );
};

export default SearchBar;