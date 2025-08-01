import { api } from '../api/axios.api';

import type {
    User,
    LoginPayload,
    LoginResponse,
} from '../types';
import rawAxios from './rawAxios';

interface RefreshResponse {
    accessToken: string;
    usuario: User;
}

export const refreshToken = async (): Promise<RefreshResponse> => {
    const res = await rawAxios.post<RefreshResponse>('/auth/refresh');

    const { accessToken, usuario } = res.data;
    return { accessToken, usuario };
};

// 👤 GET /usuarios/perfil
export const getUserProfile = async (): Promise<User> => {
    const { data } = await api.get<User>('/users/profile');

    return data;
};

// 🔐 POST /auth/login
export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
        const { data } = await api.post<LoginResponse>('/auth/login', payload);
        return data;
    } catch (error: any) {
        // Optional: Log for debugging only if needed
        // console.warn('Login error:', error.response?.data || error.message);

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
export const logoutUser = () => {

};

