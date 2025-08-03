import api from '../api/axios.api';
import type { ActiveVisitorsResponse } from '../types';
import type { Visit, VisitFilters, VisitGroupedByDate, VisitGroupedByPath } from '../types/visit';

export const getRecentVisits = async (): Promise<Visit[]> => {
    const { data } = await api.get<Visit[]>('/visits');
    return data;
};

export const getVisitCount = async (): Promise<number> => {
    const { data } = await api.get<{ total: number }>('/visits/count');
    return data.total;
};

export const getVisitsGroupedByPath = async (): Promise<VisitGroupedByPath[]> => {
    const { data } = await api.get<VisitGroupedByPath[]>('/visits/group-by-path');
    return data;
};

export const getVisitsGroupedByDate = async (): Promise<VisitGroupedByDate[]> => {
    const { data } = await api.get('/visits/group-by-date');
    return data;
};

export const getFilteredVisits = async (filters: VisitFilters): Promise<Visit[]> => {
    const queryParams = new URLSearchParams();

    if (filters.from) queryParams.append('from', filters.from);
    if (filters.to) queryParams.append('to', filters.to);
    if (filters.path) queryParams.append('path', filters.path);

    const url = `/visits?${queryParams.toString()}`;
    const { data } = await api.get<Visit[]>(url);

    return data;
};

export const getActiveVisitors = async (): Promise<ActiveVisitorsResponse> => {
    const { data } = await api.get<ActiveVisitorsResponse>('/visitors/active');
    return data;
};