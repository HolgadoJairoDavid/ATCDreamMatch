const validateFormTeams = (team, teams) => {
    const messageError = {
        name: '',
        players: ''
    }
    if (!team.name.trim()) {
        messageError.name = 'Name is required'
    }

    if (teams.some((t) => t.name.toLowerCase().trim() === team.name.toLowerCase().trim())) {
        messageError.name = 'Name already exists'
    }

    if (team.players.length < 5) {
        messageError.players = 'You need at least 5 players'
    }

    return messageError
}

export default validateFormTeams;