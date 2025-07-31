import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getDashboardStats } from '../../services/dashboard';
import type { DashboardStats } from '../../types';

interface DashboardState {
    stats: DashboardStats | null;
    loading: boolean;
    fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()(
    devtools(
        immer((set) => ({
            stats: null,
            loading: false,

            fetchStats: async () => {
                set((state) => {
                    state.loading = true;
                });

                try {
                    const stats = await getDashboardStats();
                    set((state) => {
                        state.stats = stats;
                    });
                    // console.log('📊 Dashboard stats loaded:', stats);

                    set((state) => {
                        state.loading = false;
                    });
                } catch (error) {
                    console.error('❌ Failed to fetch dashboard stats:', error);
                } finally {
                    set((state) => {
                        state.loading = false;
                    });
                }
            },
        })),
        { name: 'DashboardStore' }
    )
);
