import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 15000,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
    // Puedes mapear mensajes de error aquí
    return Promise.reject(err);
    }
);

export default api;