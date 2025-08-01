import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/admin/useAuthStore';
import { refreshToken } from '../services/auth';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    withCredentials: false, // ❗ Since you're not using cookies anymore
});

// ✅ Attach Authorization header if token exists
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = useAuthStore.getState().token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// ✅ Refresh token on 401
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Only attempt retry once
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshTokenValue = localStorage.getItem('refreshToken');
                if (!refreshTokenValue) throw new Error('No refresh token available');

                const refreshed = await refreshToken(refreshTokenValue);
                if (!refreshed?.accessToken) throw new Error('Token refresh failed');

                // Set new token in store
                useAuthStore.getState().setToken(refreshed.accessToken);

                console.warn('🔁 Retrying request with refreshed token...');

                // Re-attach new token and retry request
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
                }

                return api(originalRequest);
            } catch (refreshError) {
                useAuthStore.getState().logout(); // Optionally force logout
                return Promise.reject(refreshError);
            }
        }

        // Special case for login failure
        if (error.response?.status === 401 && error.config?.url?.includes('/auth/login')) {
            return Promise.reject(new Error('Invalid credentials'));
        }

        return Promise.reject(error);
    }
);

export default api;
