import style from './teams.module.css'
import NavBar from '../../components/navBar/NavBar'
import SearchBar from '../../components/searchBar/SearchBar'
import useTeamsStore from '../../stores/store'

const Teams = () => {
    const bear = useTeamsStore(state => state.bears)
    console.log(bear)
    return (
        <div>
            <NavBar />
            <SearchBar />
            <div className={style.Teams}>
                <h1>Teams</h1>
            </div>
        </div>
    )
}

export default Teams