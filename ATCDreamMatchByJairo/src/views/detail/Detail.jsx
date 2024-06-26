import { useParams, NavLink, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/NavBar'
import style from './detail.module.css'
import Toast from '../../components/toast/Toast'
import useTeamsStore from '../../stores/teamsStore'
import useToastStore from '../../stores/toastStore'
import ModalTeamUpsert from '../../components/modalTeamUpsert/ModalTeamUpsert';
import { useState, useEffect } from 'react';
const Detail = () => {
    const navigate = useNavigate()
    const { name } = useParams();
    const {teams, setTeamCurrent, addTeamIsOpen, openAddTeam} = useTeamsStore(state => state)
    const { toast } = useToastStore(state => state)
    const [teamsCopy, setTeamsCopy] = useState([...teams])
    const [index, setIndex] = useState(0)
    const handleEditTeam = () => {
        setIndex(teams.findIndex((team) => team.name === name))
        setTeamCurrent({...teams[index], team_id: index})
        openAddTeam()
    }
    useEffect(() => {
        navigate(`/detail/${teams[index]?.name}`)
        setTeamsCopy([...teams])
    }, [addTeamIsOpen, navigate])
    return (
        <div>
            <NavBar />
            {toast && <Toast title="Éxito" message="Se guardó correctamente"  error={false} /> }
            {!addTeamIsOpen && <div className={style.Detail}>
                <button><NavLink to='/teams'>Volver</NavLink></button>
                <button onClick={handleEditTeam}>Editar</button>
                <h2>{name}</h2>
                {
                    teamsCopy?.map((team) => {
                        if (team.name === name) {
                            return (
                                <div key={team.name}>
                                    <h3>Jugadores</h3>
                                    <ul>
                                        {
                                            team.players.map((player) => (
                                                <div key={player.player_id}>
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
            }
             {addTeamIsOpen && <ModalTeamUpsert />}

        </div>
    );
    };

export default Detail;