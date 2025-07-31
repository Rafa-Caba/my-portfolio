import api from "../api/axios.api";
import type { SiteSettings } from "../types";

export const getSiteSettings = async (): Promise<SiteSettings> => {
    const { data } = await api.get<SiteSettings>('/settings');
    return data;
};

export const getPublicSiteSettings = async (): Promise<Partial<SiteSettings>> => {
    const { data } = await api.get<Partial<SiteSettings>>('/settings/public-settings');
    return data;
};

export const updateSiteSettings = async (payload: FormData): Promise<SiteSettings> => {
    const { data } = await api.patch<SiteSettings>('/settings', payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};
