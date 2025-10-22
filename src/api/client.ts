import axios from "axios";

const api = axios.create({
    baseURL: "https://www.episodate.com/api",
    timeout: 10000,
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
    console.error("Error en la API:", error);
    return Promise.reject(error);
    }
);

export default api;