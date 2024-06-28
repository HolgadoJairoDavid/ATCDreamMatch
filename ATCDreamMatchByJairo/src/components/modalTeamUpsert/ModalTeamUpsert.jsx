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
import {Tooltip} from "react-tooltip";

const ModalTeamUpsert = () => {
    const { closeAddTeam, removeAllPlayersSearch, teamCurrent, setTeamCurrent, removeTeamCurrent, getTeamCurrent, upsertTeam, teams} = useTeamsStore(state => state)
    const { setIsLoading, getCurrentLoading } = useLoadingStore(state => state)
    const { setToast, setShowConfetti } = useToastStore(state => state)
    const {players, playersFiltered, setPlayersFiltered, filterType, setFilterType, orderBy, setOrderBy, setPlayersOrderBy} = usePlayersStore(state => state)
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

    // HANDLE ORDER BY
    const handleOrderBy = (e) => {
        setOrderBy(e.target.value)
        setPlayersOrderBy(e.target.value)
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
        setCurrentPage(1)
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
        if (teams.length === 1) {
            setShowConfetti(true)
        }
        upsertTeam(team)
        closeAddTeam()
        setCurrentPage(1)
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
            setShowConfetti(false)
        }, 3000)

    }

    const disabledButtonAddPlayer = (player) => {
        return getTeamCurrent().players?.some((p) => p.player_id === player.player_id) || getTeamCurrent().players.length === 5 || teams?.some((t, index) => index !== getTeamCurrent().team_id && t.players.some((p) => p.player_id === player.player_id))
     }

     
    return (
        <div>
                                <div className={style.AddTeamModal}>
                                <div className={style.FormTeamModal}>
                                <button className={style.CloseTeamButton} onClick={handleClickCloseModal} data-tooltip-id="tool-close" data-tooltip-content="Volver">Cerrar</button>
                                <Tooltip id="tool-close" place="bottom"/>
                                <form>
                                    <input name='teamName' type="text" placeholder="Nombre del equipo" onChange={handleForm} value={teamName}/>
                                    {messageError && messageError.name !== "" && <p className={style.MessageError}>{messageError.name}</p>}
                                    <SearchBar />
                                </form>
                                   <div className={style.FiltersAndOrdered}>
                                   {
                                        players.length > 0 && <div>
                                            <select name="filterPlayer" onChange={handleSelectFilterPlayer} value={filterType}>
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
                                    { players.length > 0 && <div>
                                            <select name="orderBy" onChange={handleOrderBy} value={orderBy}>
                                                <option value="" disabled={true}>Mostrar de forma</option>
                                                <option value="Ascendent">Ascendente</option>
                                                <option value="Descendent">Descendente</option>
                                            </select>
                                        </div>
                                    }
                                   </div>
                                </div>
                                <div className={style.ContainerPlayers}>
                                    {getCurrentLoading() && <div className={style.Searching}><p>Buscando...</p></div>}
                                    {!getCurrentLoading() && <div className={style.PlayersSearch}>
                                        {currentPlayers.length > 0 && currentPlayers.sort().slice(0, 10).map((player, index) => (
                                            <div key={index} className={style.PlayerCard}>
                                                <div className={style.PlayerCardInfo}>
                                                <button onClick={() => handleAddPlayer({...player})} value={player} disabled={disabledButtonAddPlayer(player)} data-tooltip-id={`tool-add-player-${player.player_id}`} data-tooltip-content='No disponible'>+</button>
                                                {teams?.some((t, index) => index !== getTeamCurrent().team_id && t.players.some((p) => p.player_id === player.player_id)) && <Tooltip id={`tool-add-player-${player.player_id}`}/>}
                                                <h2>{player.player_name}</h2>
                                                <p>{player.player_type}</p>
                                                </div>
                                            </div>
                                        ))}
                                        
                                </div>}
                                    <div className={style.PlayersAdded}>
                                        {getTeamCurrent().players?.length > 0 && getTeamCurrent().players?.map((player, index) => (
                                            <div key={index} className={style.PlayerCard}>
                                                <div className={style.PlayerCardInfo}>
                                                <button onClick={() => handleRemovePlayer({...player})} value={player}>-</button>
                                                <h2>{player.player_name}</h2>
                                                <p>{player.player_type}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {!getCurrentLoading() && <div className={style.Pagination}>
                                        {<button onClick={() => setCurrentPage(currentPage - 1)} className={!(currentPage === 1) ? style.PrevButton : style.NoPrevButton}>
                                        Anterior
                                        </button>}
                                        {[...Array(totalPages).keys()].map((pageNumber) => (
                                            playersFiltered.length > 10 && <button
                                            key={pageNumber + 1}
                                            onClick={() => setCurrentPage(pageNumber + 1)}
                                            disabled={currentPage === pageNumber + 1}
                                            className={style.PaginationButtonNumber}
                                            >
                                            {pageNumber + 1}
                                        </button>
                                        ))}
                                            {<button onClick={() => setCurrentPage(currentPage + 1)} className={!(indexOfLastPlayer >= playersFiltered.length) ? style.NextButton : style.NoNextButton}>
                                            Siguiente
                                        </button>}
                                </div>}
                                </div>
                                <div className={style.SaveTeamContainer}>
                                {messageError && messageError.players !== "" && countPlayersAdded !== 0 && <p className={style.MessageError}>{messageError.players}</p>}
                                <button onClick={() => saveTeam()} disabled={getTeamCurrent().name === "" || getTeamCurrent().players?.length < 5 || messageError.name !== "" || messageError.players !== ""} className={style.SaveTeam}data-tooltip-id="tool-save-team" data-tooltip-content="Guardar equipo">Guardar Equipo</button>
                                <Tooltip id="tool-save-team" place="left"/>
                                </div>
                            </div>
                        
    )
}

export default ModalTeamUpsert;