import React, { useState } from 'react'
import style from './teams.module.css'
import NavBar from '../../components/navBar/NavBar'
import SearchBar from '../../components/searchBar/SearchBar'
import useTeamsStore from '../../stores/store'
import validateFormTeams from '../../helpers/validateFormTeams'

const Teams = () => {
    const teams = useTeamsStore(state => state.teams)
    const {addTeamIsOpen, openAddTeam, closeAddTeam, playersSearch, removeAllPlayersSearch, teamCurrent, setTeamCurrent, removeTeamCurrent, getTeamCurrent, addTeam, removeTeam} = useTeamsStore(state => state)
    const [messageError, setMessageError] = useState({
        name: '',
        players: ''
    });
    const [countPlayersAdded, setCountPlayersAdded] = useState(0)
    const [players, setPlayers] = useState(getTeamCurrent().players)
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
    const handleForm = (e) => {
        setTeamCurrent({
            ...teamCurrent,
            name: e.target.value
        })
        const team = getTeamCurrent()
        setMessageError(validateFormTeams(team))
    }
    const handleAddPlayer = (player) => {
        if (players.length === 5) {
            return
        }
        setTeamCurrent({
            ...teamCurrent,
            players: players.some((p) => p.player_id === player.player_id) ? teamCurrent.players : [...teamCurrent.players, player]
        })
        setPlayers([...getTeamCurrent().players])
        setMessageError(validateFormTeams(getTeamCurrent()))
        setCountPlayersAdded(countPlayersAdded + 1)
    }
    const handleRemovePlayer = (player) => {
        setTeamCurrent({
            ...teamCurrent,
            players: teamCurrent.players.filter((p) => p.player_id !== player.player_id)
        })
        setPlayers(players.filter((p) => p.player_id !== player.player_id))
        setMessageError(validateFormTeams(getTeamCurrent()))
    }
    const saveTeam = () => {
        console.log('Saving team')
        const team = getTeamCurrent()
        setMessageError(validateFormTeams(team))
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
        
        removeTeamCurrent()
    }
    return (
        <div>
            <NavBar />
            <div className={style.Teams}>
                {!addTeamIsOpen && <h1>Teams</h1>}
                <div className={style.TeamsContainer}>
                    {teams.length > 0 && !addTeamIsOpen && teams.map((team, index) => (
                        <div key={index} className={style.TeamCard}>
                            <h2>{team.name}</h2>
                            <button onClick={() => removeTeam(team)} className={style.DeleteTeam}>X</button>
                            <button>View Details</button>
                        </div>
                    )) } 
                    
                    { (teams.length === 0 && !addTeamIsOpen) && <h2>Parece que aún no tienes equipos. ¡Anímate a crearlos!</h2>}
                    {!addTeamIsOpen && teams.length < 2 && <button className={style.AddTeamButton} onClick={() => openAddTeam()}>Agregar Equipo</button> }
                    {
                        addTeamIsOpen && (
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
                                            <button onClick={() => handleAddPlayer({...player})} value={player}>+</button>
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
                </div>
            </div>
        </div>
    )
}

export default Teams