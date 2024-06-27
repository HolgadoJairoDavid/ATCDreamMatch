import SearchBar from '../../components/searchBar/SearchBar'
import style from './modalTeamUpsert.module.css'
import { useState } from 'react'
import { useMatch } from 'react-router-dom'
import useTeamsStore from '../../stores/teamsStore'
import useLoadingStore from '../../stores/loadingStore'
import validateFormTeams from '../../helpers/validateFormTeams'
import useToastStore from '../../stores/toastStore'
import usePlayersStore from '../../stores/playersStore'
import usePaginateStore from '../../stores/paginateStore'

const ModalTeamUpsert = () => {
    const { closeAddTeam, removeAllPlayersSearch, teamCurrent, setTeamCurrent, removeTeamCurrent, getTeamCurrent, upsertTeam, teams} = useTeamsStore(state => state)
    const { setIsLoading, getCurrentLoading } = useLoadingStore(state => state)
    const { setToast } = useToastStore(state => state)
    const {players, playersFiltered, setPlayersFiltered, filterType, setFilterType } = usePlayersStore(state => state)
    const { currentPage, playersPerPage, setCurrentPage} = usePaginateStore(state => state)
    
    const [countPlayersAdded, setCountPlayersAdded] = useState(0)
    const [messageError, setMessageError] = useState({
        name: '',
        players: ''
    });
    const match = useMatch('/teams')

    // PAGINATION
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = playersFiltered.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const totalPages = Math.ceil(playersFiltered.length / playersPerPage);

    // HANDLE SELECT FILTER PLAYER
    const handleSelectFilterPlayer = (e) => {
        setFilterType(e.target.value)
        setPlayersFiltered(e.target.value)
        setCurrentPage(1);
    }

    // HANDLE REMOVE PLAYER
    const handleRemovePlayer = (player) => {
        setTeamCurrent({
            ...teamCurrent,
            players: getTeamCurrent().players.filter((p) => p.player_id !== player.player_id)
        })
        setMessageError(validateFormTeams(getTeamCurrent(), teams, match))
    }
    const [teamName, setTeamName] = useState(getTeamCurrent().name);
    const handleForm = (e) => {
        setTeamName(e.target.value); 
        setTeamCurrent({
            ...teamCurrent,
            name: e.target.value
        })
        const team = getTeamCurrent()
        setMessageError(validateFormTeams(team, teams, match))
    }

    // HANDLE ADD PLAYER
    const handleAddPlayer = (player) => {
        if (getTeamCurrent().players.length === 5) {
            return
        }
        setTeamCurrent({
            ...teamCurrent,
            players: getTeamCurrent().players.some((p) => p.player_id === player.player_id) ? getTeamCurrent().players : [...getTeamCurrent().players, {
                player_id: player.player_id,
                player_name: player.player_name,
                player_type: player.player_type
            }]
        })
        setMessageError(validateFormTeams(getTeamCurrent(), teams, match))
        setCountPlayersAdded(countPlayersAdded + 1)
    }

    // CLOSE MODAL
    const handleClickCloseModal = () => {
        closeAddTeam()
        setCountPlayersAdded(0)
        removeAllPlayersSearch()
        setFilterType('')
        setPlayersFiltered([])
        setIsLoading(false)
        setMessageError({
            name: '',
            players: ''
        })
        removeTeamCurrent()
    }

    // UPSERT TEAM
    const saveTeam = () => {
        const team = getTeamCurrent()
        setMessageError(validateFormTeams(team, teams, match))
        if (messageError.name !== '' || messageError.players !== '') {
            return
        }
        upsertTeam(team)
        closeAddTeam()
        removeAllPlayersSearch()
        setCountPlayersAdded(0)
        setFilterType('')
        setPlayersFiltered([])
        setMessageError({
            name: '',
            players: ''
        })
        setIsLoading(false)

        setToast(true)
        removeTeamCurrent()
        setTimeout(() => {
            setToast(false)
        }, 3000)

    }

    const disabledButtonAddPlayer = (player) => {
        return getTeamCurrent().players?.some((p) => p.player_id === player.player_id) || getTeamCurrent().players.length === 5 || teams?.some((t) => t.players.some((p) => p.player_id === player.player_id))
     }

     
    return (
        <div className={style.AddTeamModal}>
                                <button className={style.CloseTeamButton} onClick={handleClickCloseModal}>Cerrar</button>
                                <form>
                                    <input name='teamName' type="text" placeholder="Nombre del equipo" onChange={handleForm} value={teamName}/>
                                    {messageError && messageError.name !== "" && <p>{messageError.name}</p>}
                                    <SearchBar />
                                </form>
                                    {
                                        players.length > 0 && <div>
                                            <select name="filterPlayer" id="" onChange={handleSelectFilterPlayer} value={filterType}>
                                            <option value="" disabled={true}>Filtrar por tipo</option>
                                            <option value="All">Todos</option>
                                                {
                                                    Array.from(new Set(players.map(player => player.player_type)))
                                                        .map((playerType, index) => (
                                                          <option key={index} value={playerType}>{playerType}</option>
                                                        ))
                                                }
                                            </select>
                                        </div>
                                    }
                                <div className={style.ContainerPlayers}>
                                {getCurrentLoading() && <p>Buscando...</p>}
                                {!getCurrentLoading() && <div className={style.PlayersSearch}>
                                    {currentPlayers.length > 0 && currentPlayers.sort().slice(0, 10).map((player, index) => (
                                        <div key={index} className={style.PlayerCard}>
                                            <button onClick={() => handleAddPlayer({...player})} value={player} disabled={disabledButtonAddPlayer(player)}>+</button>
                                            <h2>{player.player_name}</h2>
                                            <p>{player.player_type}</p>
                                        </div>
                                    ))}
                                    
                                </div>}
                                {/* Current players added */}
                                <div className={style.PlayersAdded}>
                                    {getTeamCurrent().players?.length > 0 && getTeamCurrent().players?.map((player, index) => (
                                        <div key={index} className={style.PlayerCard}>
                                            <button onClick={() => handleRemovePlayer({...player})} value={player}>-</button>
                                            <h2>{player.player_name}</h2>
                                            <p>{player.player_type}</p>
                                        </div>
                                    ))}
                                </div>
                                </div>
                                <div className={style.Pagination}>
                                        {!(currentPage === 1) && <button onClick={() => setCurrentPage(currentPage - 1)}>
                                        Anterior
                                        </button>}
                                        {[...Array(totalPages).keys()].map((pageNumber) => (
                                    <button
                                        key={pageNumber + 1}
                                        onClick={() => setCurrentPage(pageNumber + 1)}
                                        disabled={currentPage === pageNumber + 1}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                    ))}
                                        {!(indexOfLastPlayer >= playersFiltered.length) && <button onClick={() => setCurrentPage(currentPage + 1)}>
                                        Siguiente
                                        </button>}
                                    </div>
                                {messageError && messageError.players !== "" && countPlayersAdded !== 0 && <p>{messageError.players}</p>}
                                <button onClick={() => saveTeam()} disabled={getTeamCurrent().name === "" || getTeamCurrent().players?.length < 5 || messageError.name !== "" || messageError.players !== ""}>Save team</button>
                            </div>
                        
    )
}

export default ModalTeamUpsert;