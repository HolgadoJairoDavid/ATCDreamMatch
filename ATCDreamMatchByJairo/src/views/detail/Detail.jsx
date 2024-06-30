import { useParams, NavLink, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/NavBar'
import style from './detail.module.css'
import Toast from '../../components/toast/Toast'
import useTeamsStore from '../../stores/teamsStore'
import useToastStore from '../../stores/toastStore'
import SnackBar from '../../components/snackBar/SnackBar'
import useSnackStore from '../../stores/snackStore';
import ModalTeamUpsert from '../../components/modalTeamUpsert/ModalTeamUpsert';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

const Detail = () => {
    const navigate = useNavigate()
    const { name } = useParams();
    const {teams, setTeamCurrent, addTeamIsOpen, openAddTeam} = useTeamsStore(state => state)
    const { getCurrentSnack } = useSnackStore(state => state)
    const { toast } = useToastStore(state => state)
    const [teamsCopy, setTeamsCopy] = useState([...teams])
    const [index, setIndex] = useState(0)
    const handleEditTeam = () => {
        setIndex(teams.findIndex((team) => team.name === name))
        setTeamCurrent({...teams[teams.findIndex((team) => team.name === name)], team_id: teams.findIndex((team) => team.name === name)})
        openAddTeam()
    }
    useEffect(() => {
        setTeamsCopy([...teams])
        if (!teams.some((team) => team.name === name)) {
        navigate(`/detail/${teams[index]?.name}`)
        }
    }, [addTeamIsOpen, navigate])
    return (
        <div className={style.ViewDetail}>
            <NavBar />
            {getCurrentSnack().open && <SnackBar />}
            <div className={style.DisplayContainer}>
                {toast && <Toast title="Éxito" message="Se guardó correctamente"  error={false} /> }
            {!addTeamIsOpen && <div className={style.Detail}>
               <div className={style.ButtonsDetail}>
               <NavLink to='/teams'> <button data-tooltip-id="tool-back" data-tooltip-content="Volver">Volver</button></NavLink> 
                <Tooltip id="tool-back" place="left"/>
               <button onClick={handleEditTeam} data-tooltip-id="tool-edit" data-tooltip-content="Editar equipo">Editar</button>
               <Tooltip id="tool-edit" place="right"/>
               </div>
               <div>
               <h2>{name}</h2>
                {
                    teamsCopy?.map((team) => {
                        if (team.name === name) {
                            return (
                                <div key={team.name} className={style.DetailTeam}>
                                    <div className={style.SectionPlayersAndType}>
                                        <h3>Jugadores</h3>
                                        <h3>Roles</h3>
                                    </div>
                                    <ul>
                                        {
                                            team.players.map((player) => (
                                                <div key={player.player_id} className={style.PlayerInfo}>
                                                    <p>{player.player_name}</p>
                                                    <p>{player.player_type}</p>
                                                </div>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
                        }
                }
                )
            }
               </div>
            </div>
            }
             {addTeamIsOpen && <ModalTeamUpsert />}
            </div>

        </div>
    );
    };

export default Detail;