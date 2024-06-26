import SearchBar from '../../components/searchBar/SearchBar'
import style from './modalTeamUpsert.module.css'
import { useState } from 'react'
import useTeamsStore from '../../stores/store'
import validateFormTeams from '../../helpers/validateFormTeams'

const ModalTeamUpsert = ({ setShowToast }) => {
    const { closeAddTeam, playersSearch, removeAllPlayersSearch, teamCurrent, setTeamCurrent, removeTeamCurrent, getTeamCurrent, addTeam, teams} = useTeamsStore(state => state)
    const [countPlayersAdded, setCountPlayersAdded] = useState(0)
    const [players, setPlayers] = useState(getTeamCurrent().players)
    const [messageError, setMessageError] = useState({
        name: '',
        players: ''
    });
    
    const handleRemovePlayer = (player) => {
        setTeamCurrent({
            ...teamCurrent,
            players: teamCurrent.players.filter((p) => p.player_id !== player.player_id)
        })
        setPlayers(players.filter((p) => p.player_id !== player.player_id))
        setMessageError(validateFormTeams(getTeamCurrent(), teams))
    }
    const handleForm = (e) => {
        setTeamCurrent({
            ...teamCurrent,
            name: e.target.value
        })
        const team = getTeamCurrent()
        setMessageError(validateFormTeams(team, teams))
    }
    const handleAddPlayer = (player) => {
        if (players.length === 5) {
            return
        }
        setTeamCurrent({
            ...teamCurrent,
            players: players.some((p) => p.player_id === player.player_id) ? teamCurrent.players : [...teamCurrent.players, {
                player_id: player.player_id,
                player_name: player.player_name,
                player_type: player.player_type
            }]
        })
        setPlayers([...getTeamCurrent().players])
        setMessageError(validateFormTeams(getTeamCurrent(), teams))
        setCountPlayersAdded(countPlayersAdded + 1)
    }
    const handleClickCloseModal = () => {
        closeAddTeam()
        setCountPlayersAdded(0)
        removeAllPlayersSearch()
        setPlayers([])
        setMessageError({
            name: '',
            players: ''
        })
        removeTeamCurrent()
    }
    const saveTeam = () => {
        const team = getTeamCurrent()
        setMessageError(validateFormTeams(team, teams))
        if (messageError.name !== '' || messageError.players !== '') {
            return
        }
        addTeam(team)
        closeAddTeam()
        removeAllPlayersSearch()
        setCountPlayersAdded(0)
        setPlayers([])
        setMessageError({
            name: '',
            players: ''
        })

        setShowToast(true)
        removeTeamCurrent()
        setTimeout(() => {
            setShowToast(false)
        }, 3000)

    }

    const disabledButtonAddPlayer = (player) => {
        return players?.some((p) => p.player_id === player.player_id) || players.length === 5 || teams?.some((t) => t.players.some((p) => p.player_id === player.player_id))
     }

     
    return (
        <div className={style.AddTeamModal}>
                                <button className={style.CloseTeamButton} onClick={handleClickCloseModal}>Close</button>
                                <form>
                                    <input type="text" placeholder="Nombre del equipo" onChange={handleForm}/>
                                    {messageError && messageError.name !== "" && <p>{messageError.name}</p>}
                                    <SearchBar />
                                </form>
                                <div className={style.ContainerPlayers}>
                                <div className={style.PlayersSearch}>
                                    {playersSearch.length > 0 && playersSearch.sort().slice(0, 10).map((player, index) => (
                                        <div key={index} className={style.PlayerCard}>
                                            <button onClick={() => handleAddPlayer({...player})} value={player} disabled={disabledButtonAddPlayer(player)}>+</button>
                                            <h2>{player.player_name}</h2>
                                            <p>{player.player_type}</p>
                                        </div>
                                    ))}
                                </div>
                                {/* Current players added */}
                                <div className={style.PlayersAdded}>
                                    {players.length > 0 && players.map((player, index) => (
                                        <div key={index} className={style.PlayerCard}>
                                            <button onClick={() => handleRemovePlayer({...player})} value={player}>-</button>
                                            <h2>{player.player_name}</h2>
                                            <p>{player.player_type}</p>
                                        </div>
                                    ))}
                                </div>
                                </div>
                                {messageError && messageError.players !== "" && countPlayersAdded !== 0 && <p>{messageError.players}</p>}
                                <button onClick={() => saveTeam()} disabled={getTeamCurrent().name === "" || players.length < 5 || messageError.name !== "" || messageError.players !== ""}>Save team</button>
                            </div>
                        
    )
}

export default ModalTeamUpsert;