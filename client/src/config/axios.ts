import axios from "axios";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
    timeout: 3000,
    headers: { "X-Custom-Header": "foobar" },
});

// Add token to request headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, clear auth
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);
