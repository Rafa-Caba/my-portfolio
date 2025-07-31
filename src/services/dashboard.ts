import api from '../api/axios.api';
import type { DashboardStats } from '../types/Dashboard';

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const { data } = await api.get<DashboardStats>('/dashboard/stats');

    return data;
};