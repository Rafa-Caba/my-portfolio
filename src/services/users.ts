import api from '../api/axios.api';
import type { ChangePasswordData, User } from '../types';

export const getPublicUserProfile = async (): Promise<Partial<User>> => {
    const { data } = await api.get<Partial<User>>('/users/public-user-profile');

    return data;
};

export const getUserById = async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
};

export const updateUser = async (id: string, updateData: FormData): Promise<User> => {
    const { data } = await api.put<User>(`/users/${id}`, updateData, {
        headers: { 'Content-Type': 'multipart/form-data', },
    });

    return data;
};

export const changePassword = async (payload: ChangePasswordData): Promise<void> => {
    await api.patch('/users/change-password', payload);
};