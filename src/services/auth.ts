import { api } from '../api/axios.api';

import type {
    User,
    LoginPayload,
    LoginResponse,
    LogoutResponse,
    RefreshResponse,
} from '../types';
import rawAxios from './rawAxios';

// 🔐 POST /auth/login
export const loginUser = async (payload: LoginPayload): Promise<LoginResponse | null> => {
    try {
        const { data } = await api.post<LoginResponse>('/auth/login', payload);
        return data;
    } catch (error: any) {
        console.warn('Login error:', error.response?.data || error.message);
        return null!;
    }
};

// 🔁 POST /auth/refresh (now takes refreshToken in body)
export const refreshToken = async (refreshToken: string): Promise<RefreshResponse | null> => {
    try {
        const { data } = await rawAxios.post<RefreshResponse>('/auth/refresh', { token: refreshToken });
        return data;
    } catch (error: any) {
        console.warn('Refresh token error:', error.response?.data || error.message);
        return null!;
    }
};

// 🆕 POST /auth/register
export const registerUser = async (formData: FormData): Promise<User> => {
    const { data } = await api.post<User>('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data', },
        withCredentials: true,
    });
    return data;
};

// 🚪 Optional: Logout just clears local state, not server (or invalidate refresh token)
export const logoutUser = async (refreshTokenValue: string): Promise<LogoutResponse> => {
    const { data } = await api.post('/auth/logout', { token: refreshTokenValue });
    return data;
};

// 👤 GET /usuarios/perfil
export const getUserProfile = async (): Promise<User> => {
    const { data } = await api.get<User>('/users/profile');
    return data;
};
