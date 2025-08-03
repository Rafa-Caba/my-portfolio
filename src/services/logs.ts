import api from '../api/axios.api';
import type { Log } from '../types';

export const getLogs = async (): Promise<Log[]> => {
    const { data } = await api.get<Log[]>('/logs');

    return data;
};

export const getLogsByUser = async (userId: string): Promise<Log[]> => {
    const { data } = await api.get<Log[]>(`/logs/user/${userId}`);
    return data;
};
