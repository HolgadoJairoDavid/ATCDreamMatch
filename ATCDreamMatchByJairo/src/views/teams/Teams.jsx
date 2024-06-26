import React, { useState } from 'react'
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

const Teams = () => {
    const teams = useTeamsStore(state => state.teams)
    const {addTeamIsOpen, openAddTeam} = useTeamsStore(state => state)
    const { snack } = useSnackStore(state => state)
    const {toast} = useToastStore(state => state)
    return (
        <div>
            <NavBar />
            {snack?.open && <SnackBar />}
            {teams?.length === 2 && toast && <Confetti />}
            {toast && <Toast title="Éxito" message="Se guardó correctamente" error={false} /> }
            <div className={style.Teams}>
                {!addTeamIsOpen && <h1>Equipos</h1>}
                <div className={style.TeamsContainer}>
                    {teams?.length > 0 && !addTeamIsOpen && teams.map((team, index) => (
                        <Team key={index} name={team.name} team={team} />
                    )) } 
                    
                    { (teams?.length === 0 && !addTeamIsOpen) && <h2>Parece que aún no tienes equipos. ¡Anímate a crearlos!</h2>}
                    {!addTeamIsOpen && teams?.length < 2 && <button className={style.AddTeamButton} onClick={() => openAddTeam()}>Agregar Equipo</button> }
                    {
                        addTeamIsOpen && <ModalTeamUpsert />
                    }
                </div>
            </div>
        </div>
    )
}

export default Teams