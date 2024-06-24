import style from './teams.module.css'
import NavBar from '../../components/navBar/NavBar'
// import SearchBar from '../../components/searchBar/SearchBar'
import useTeamsStore from '../../stores/store'

const Teams = () => {
    const teams = useTeamsStore(state => state.teams)
    return (
        <div>
            <NavBar />
            {/* <SearchBar /> */}
            <div className={style.Teams}>
                <h1>Teams</h1>
                <div className={style.TeamsContainer}>
                    {teams.length > 0 ? teams.map((team, index) => (
                        <div key={index} className={style.TeamCard}>
                            <img src={team.img} alt={team.name} />
                            <h2>{team.name}</h2>
                            <h3>{team.league}</h3>
                            <p>{team.stadium}</p>
                        </div>
                    )) : <h2>Parece que aún no tienes equipos. ¡Anímate a crearlos!</h2>}
                </div>
            </div>
        </div>
    )
}

export default Teams