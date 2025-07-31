import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getRecentActivity } from '../../services/getRecentActivity';
import type { RecentActivity } from '../../types';

interface RecentActivityState {
    activity: RecentActivity[];
    loading: boolean;
    fetchRecentActivity: () => Promise<void>;
}

export const useRecentActivityStore = create<RecentActivityState>()(
    devtools(
        immer((set) => ({
            activity: [],
            loading: false,

            fetchRecentActivity: async () => {
                set((state) => {
                    state.loading = true;
                });
                try {
                    const data = await getRecentActivity();
                    set((state) => {
                        state.activity = data;
                    });
                } catch (error) {
                    console.error('❌ Failed to fetch activity:', error);
                } finally {
                    set((state) => {
                        state.loading = false;
                    });
                }
            },
        })),
        { name: 'RecentActivityStore' }
    )
);
