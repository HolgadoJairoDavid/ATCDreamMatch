import style from './team.module.css'
import { NavLink } from 'react-router-dom';
import useTeamsStore from '../../stores/teamsStore';

const Team = ({name, team}) => {
    const {removeTeam} = useTeamsStore(state => state)

    return (
        <div className={style.TeamCard}>
            <div>
                <h2>{name}</h2>
                <button><NavLink to={`/detail/${name}`}>Ver Más</NavLink></button>
            </div>
            <div className={style.ContainerDeleteTeam}>
            <button onClick={() => removeTeam(team)} className={style.DeleteTeam}>X</button>
            </div>
        </div>
    );
    }

export default Team;