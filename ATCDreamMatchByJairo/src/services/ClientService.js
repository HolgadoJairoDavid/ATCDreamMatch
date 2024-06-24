import api from "../lib/axios";

export default {
    searchPlayers(name) {
        return api.get(`/?action=get_players&player_name=${name}&APIkey=${import.meta.env.VITE_APP_API_KEY}`);
    }
};