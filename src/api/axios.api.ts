import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/admin/useAuthStore';
import { refreshToken } from '../services/auth';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    withCredentials: true,
});

// ✅ Request interceptor to attach access token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = useAuthStore.getState().token; // ✅ Get token from store at request time

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log('📦 Added token to request:', token);
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// ✅ Response interceptor to refresh token on 401
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { accessToken } = await refreshToken();

                // console.log('🔐 Retrying original request with new token:', accessToken);

                useAuthStore.getState().setToken(accessToken);

                // Retry original request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 401 && error.config?.url?.includes('/auth/login')) {
            // Silence only login 401 errors
            return Promise.reject(new Error('Invalid credentials'));
        }

        return Promise.reject(error);
    }
);

export default api;
