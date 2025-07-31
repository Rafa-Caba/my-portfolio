// src/store/public/usePublicSettingsStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { SiteSettings } from '../../types';
import { getPublicSiteSettings } from '../../services/settings';

interface PublicSettingsState {
    settings: Partial<SiteSettings> | null;
    loading: boolean;

    fetchSettings: () => Promise<void>;
}

export const usePublicSettingsStore = create<PublicSettingsState>()(
    devtools(
        persist(
            (set) => ({
                settings: null,
                loading: false,

                fetchSettings: async () => {
                    set({ loading: true });
                    try {
                        const data = await getPublicSiteSettings();
                        set({ settings: data });
                    } catch (error) {
                        console.error('❌ Failed to fetch public site settings:', error);
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            {
                name: 'PublicSettingsStore',
            }
        )
    )
);
