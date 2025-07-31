import type { User } from './index';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterPayload {
    name: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    imagen: File | null;
}