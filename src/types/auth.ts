import type { User } from './index';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    imagen: File | null;
}

export interface LoginResponse {
    mensaje: string;
    token: string;
    refreshToken: string;
    user: User;
}

export interface RefreshResponse {
    accessToken: string;
}

export interface LogoutResponse {
    message: string;
}