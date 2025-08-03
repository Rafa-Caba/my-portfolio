import api from "../api/axios.api";
import type { ActiveVisitorsResponse, VisitorLocation } from "../types";

export const getActiveVisitors = async (): Promise<ActiveVisitorsResponse> => {
    const { data } = await api.get<ActiveVisitorsResponse>('/visitors/active');
    return data;
};

export const getVisitorMap = async (): Promise<VisitorLocation[]> => {
    const { data } = await api.get<VisitorLocation[]>('/visitors/map');
    return Array.isArray(data) ? data : []; // 🔒 guards against invalid response
};