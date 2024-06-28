import api from "../lib/axios";

export default {
    searchPlayers(name) {
        const API_KEY = import.meta.env.VITE_APP_API_KEY || "ded47513a9b3291ada242205407f79d6723556c5c0c9b3da355558c73bd76235";
        return api.get(`/?action=get_players&player_name=${name}&APIkey=${API_KEY}`);
    }
};