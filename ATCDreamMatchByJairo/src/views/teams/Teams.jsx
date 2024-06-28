import React, { useEffect, useState } from 'react'
import style from './teams.module.css'
import NavBar from '../../components/navBar/NavBar'
import useTeamsStore from '../../stores/teamsStore'
import useToastStore from '../../stores/toastStore'
import useSnackStore from '../../stores/snackStore'
import Toast from '../../components/toast/Toast'
import Confetti from '../../components/confetti/Confetti'
import Team from '../../components/team/Team'
import ModalTeamUpsert from '../../components/modalTeamUpsert/ModalTeamUpsert'
import SnackBar from '../../components/snackBar/SnackBar'
import { Tooltip } from 'react-tooltip'

const Teams = () => {
    const teams = useTeamsStore(state => state.teams)
    const {toast, showConfetti} = useToastStore(state => state)
    const {addTeamIsOpen, openAddTeam} = useTeamsStore(state => state)
    const { snack } = useSnackStore(state => state)
    return (
        <div>
            <NavBar />
            {snack?.open && <SnackBar />}
            {showConfetti && <Confetti />}
            {toast && <Toast title="Éxito" message="Se guardó correctamente" error={false} /> }
            <div className={style.Teams}>
                {!addTeamIsOpen && <div className={style.TeamsContainer}>
                { <h1>Equipos</h1>}
                <div>
                    {teams?.length > 0 && !addTeamIsOpen && teams.map((team, index) => (
                        <Team key={index} name={team.name} team={team} />
                    )) } 
                    
                    { (teams?.length === 0 && !addTeamIsOpen) && <h2>Parece que aún no tienes equipos. ¡Anímate a crearlos!</h2>}
                    {!addTeamIsOpen && teams?.length < 2 && <button className={style.AddTeamButton} onClick={() => openAddTeam()} data-tooltip-id="tool-add-team" data-tooltip-content="Crear un equipo">Agregar Equipo</button> }
                    <Tooltip id="tool-add-team" place="bottom"/>
                </div>
                </div>}
                    {
                        addTeamIsOpen && <ModalTeamUpsert />
                    }
            </div>
        </div>
    )
}

export default Teams