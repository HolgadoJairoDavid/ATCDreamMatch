import React, { useState } from 'react'
import style from './teams.module.css'
import NavBar from '../../components/navBar/NavBar'
import SearchBar from '../../components/searchBar/SearchBar'
import useTeamsStore from '../../stores/store'
import validateFormTeams from '../../helpers/validateFormTeams'

const Teams = () => {
    const teams = useTeamsStore(state => state.teams)
    const {addTeamIsOpen, openAddTeam, closeAddTeam, playersSearch, removeAllPlayersSearch, teamCurrent, setTeamCurrent, removeTeamCurrent} = useTeamsStore(state => state)
    const [messageError, setMessageError] = useState({
        name: '',
        players: ''
    });
    const handleForm = (e) => {
        console.log(e.target.value)
        setTeamCurrent({
            ...teamCurrent,
            name: e.target.value
        })
        console.log(teamCurrent)
        setMessageError(validateFormTeams(teamCurrent))
        console.log(messageError)
    }
    const saveTeam = () => {
        console.log('Saving team')
        closeAddTeam()
        removeAllPlayersSearch()
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
                            <img src={team.img} alt={team.name} />
                            <h2>{team.name}</h2>
                            <h3>{team.league}</h3>
                            <p>{team.stadium}</p>
                        </div>
                    )) } 
                    
                    { (teams.length === 0 && !addTeamIsOpen) && <h2>Parece que aún no tienes equipos. ¡Anímate a crearlos!</h2>}
                    {!addTeamIsOpen && <button className={style.AddTeamButton} onClick={() => openAddTeam()}>Add Team</button> }
                    {
                        addTeamIsOpen && (
                            <div className={style.AddTeamModal}>
                                <button className={style.CloseTeamButton} onClick={() => closeAddTeam()}>Close</button>
                                <form>
                                    <input type="text" placeholder="Team Name" onChange={handleForm}/>
                                    {messageError && messageError.name !== "" && <p>{messageError.name}</p>}
                                    <SearchBar />
                                </form>
                                <div className={style.PlayersSearch}>
                                    {playersSearch.length > 0 && playersSearch.sort().slice(0, 10).map((player, index) => (
                                        <div key={index} className={style.PlayerCard}>
                                            <h2>{player.player_name}</h2>
                                            <p>{player.player_type}</p>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => saveTeam()}>Save team</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Teams