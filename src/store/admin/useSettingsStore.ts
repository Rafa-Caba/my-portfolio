// src/store/useSettingsStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { SiteSettings } from '../../types';
import { getSiteSettings, updateSiteSettings, getPublicSiteSettings } from '../../services/settings';

interface SettingsState {
    settings: Partial<SiteSettings> | null;
    loading: boolean;

    fetchSettings: () => Promise<void>;
    fetchPublicSettings: () => Promise<void>;
    saveSettings: (form: FormData) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>()(
    devtools(
        immer((set) => ({
            settings: null,
            loading: false,

            fetchSettings: async () => {
                set((state) => { state.loading = true });
                try {
                    const data = await getSiteSettings();
                    set((state) => {
                        state.settings = data;
                    });
                } catch (err) {
                    console.error('❌ Failed to fetch site settings:', err);
                } finally {
                    set((state) => { state.loading = false });
                }
            },

            fetchPublicSettings: async () => {
                set((state) => { state.loading = true });
                try {
                    const data = await getPublicSiteSettings();

                    set((state) => {
                        state.settings = data;
                    });
                } catch (err) {
                    console.error('❌ Failed to fetch public site settings:', err);
                } finally {
                    set((state) => { state.loading = false });
                }
            },

            saveSettings: async (form) => {
                set((state) => { state.loading = true });
                try {
                    const updated = await updateSiteSettings(form);
                    set((state) => {
                        state.settings = updated;
                    });
                } catch (err) {
                    console.error('❌ Failed to save site settings:', err);
                } finally {
                    set((state) => { state.loading = false });
                }
            },
        })),
        { name: 'SettingsStore' }
    )
);
