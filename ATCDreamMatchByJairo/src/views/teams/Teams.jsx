import style from './teams.module.css'
import NavBar from '../../components/navBar/NavBar'
import SearchBar from '../../components/searchBar/SearchBar'
import useTeamsStore from '../../stores/store'

const Teams = () => {
    const teams = useTeamsStore(state => state.teams)
    const {addTeamIsOpen, openAddTeam, closeAddTeam} = useTeamsStore(state => state)
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
                                    <input type="text" placeholder="Team Name" />
                                    <SearchBar />
                                </form>
                                <button>Save team</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Teams