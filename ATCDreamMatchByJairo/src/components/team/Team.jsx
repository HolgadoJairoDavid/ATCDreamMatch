import style from './team.module.css'
import { NavLink } from 'react-router-dom';
import useTeamsStore from '../../stores/teamsStore';

const Team = ({name, team}) => {
    const {removeTeam} = useTeamsStore(state => state)

    return (
        <div className={style.TeamCard}>
            <div>
                <h2>{name}</h2>
               <NavLink to={`/detail/${name}`}> <button className={style.SeeMore}>Ver Más</button></NavLink>
            </div>
            <div className={style.ContainerDeleteTeam}>
            <button onClick={() => removeTeam(team)} className={style.DeleteTeam}>X</button>
            </div>
        </div>
    );
    }

export default Team;