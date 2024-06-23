import axios from 'axios';

const api = axios.create({
    baseURL: proccess.env.REACT_APP_API_URL
});

api.interceptors.request.use((config) => {
    config.params["APIkey"] = process.env.REACT_APP_API_KEY;
    return config;
}
);

export default api;