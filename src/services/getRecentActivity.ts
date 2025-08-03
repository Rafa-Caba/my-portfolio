import api from '../api/axios.api';
import type { RecentActivity } from '../types';

export const getRecentActivity = async (): Promise<RecentActivity[]> => {
    const { data } = await api.get<RecentActivity[]>('/logs/recent');
    return data;
};