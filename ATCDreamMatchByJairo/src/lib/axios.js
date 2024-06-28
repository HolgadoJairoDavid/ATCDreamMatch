import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || "https://apiv3.apifootball.com",
});
export default api;