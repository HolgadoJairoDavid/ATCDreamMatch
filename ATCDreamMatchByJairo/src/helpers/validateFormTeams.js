const validateFormTeams = (team, teams, isCreateTeam) => {
    const messageError = {
        name: '',
        players: ''
    }
    if (!team.name.trim()) {
        messageError.name = 'El equipo requiere un nombre'
    }

    if (isCreateTeam && teams.some((t) => t.name.toLowerCase().trim() === team.name.toLowerCase().trim())) {
        messageError.name = 'Este nombre ya existe'
    }

    if (team.players.length < 5) {
        messageError.players = 'Se requiere al menos 5 jugadores'
    }

    return messageError
}

export default validateFormTeams;