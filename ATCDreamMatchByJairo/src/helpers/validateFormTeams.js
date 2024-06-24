const validateFormTeams = (team) => {
    const messageError = {
        name: '',
        players: ''
    }
    if (!team.name.trim()) {
        messageError.name = 'Name is required'
    }

    if (team.players.length < 5) {
        messageError.players = 'You need at least 5 players'
    }

    return messageError
}

export default validateFormTeams;