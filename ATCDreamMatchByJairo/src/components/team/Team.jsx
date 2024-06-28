import style from './team.module.css'
import { NavLink } from 'react-router-dom';
import useTeamsStore from '../../stores/teamsStore';
import { Tooltip } from 'react-tooltip';

const Team = ({name, team}) => {
    const {removeTeam} = useTeamsStore(state => state)

    return (
        <div className={style.TeamCard}>
            <div>
                <h2>{name}</h2>
               <NavLink to={`/detail/${name}`}> <button className={style.SeeMore} data-tooltip-id="tool-info" data-tooltip-content="&#x2139; Info">Ver Más</button></NavLink>
                <Tooltip id="tool-info" place="left"/>
            </div>
            <div className={style.ContainerDeleteTeam}>
            <button onClick={() => removeTeam(team)} className={style.DeleteTeam} data-tooltip-id="tool-delete" data-tooltip-content="&#x26A0; Eliminar equipo">X</button>
            <Tooltip id="tool-delete" place="bottom"/>
            </div>
        </div>
    );
    }

export default Team;