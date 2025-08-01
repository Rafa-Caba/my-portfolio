import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Visit, VisitFilters, VisitGroupedByDate, VisitGroupedByPath } from '../../types';
import { getFilteredVisits, getVisitCount, getVisitsGroupedByDate, getVisitsGroupedByPath } from '../../services/visits';

interface VisitState {
    visits: Visit[];
    visitCount: number;
    visitsByPath: VisitGroupedByPath[];
    groupedByDate: VisitGroupedByDate[];
    filters: VisitFilters;
    loading: boolean;

    fetchVisitCount: () => Promise<void>;
    fetchRecentVisits: () => Promise<void>;
    fetchGroupedVisits: () => Promise<void>;
    fetchGroupedByDate: () => Promise<void>;
    setFilters: (filters: VisitFilters) => void;
    resetFilters: () => void;
}

export const useVisitStore = create<VisitState>()(
    devtools(
        persist(
            immer((set, get) => ({
                loading: false,
                visits: [],
                visitCount: 0,
                visitsByPath: [],
                groupedByDate: [],
                filters: {
                    from: '',
                    to: '',
                    path: '',
                },

                fetchVisitCount: async () => {
                    set((state) => { state.loading = true });
                    try {
                        const total = await getVisitCount();
                        set((state) => { state.visitCount = total });
                    } catch (err) {
                        console.error('Failed to fetch visit count:', err);
                    } finally {
                        set((state) => { state.loading = false });
                    }
                },

                fetchRecentVisits: async () => {
                    set((s) => { s.loading = true });
                    try {
                        const { from, to, path } = get().filters;
                        const data = await getFilteredVisits({ from, to, path });
                        set((s) => { s.visits = data });
                    } catch (err) {
                        console.error('Failed to fetch filtered visits:', err);
                    } finally {
                        set((s) => { s.loading = false });
                    }
                },

                fetchGroupedVisits: async () => {
                    set((state) => { state.loading = true });
                    try {
                        const grouped = await getVisitsGroupedByPath();
                        set((state) => { state.visitsByPath = grouped });
                    } catch (err) {
                        console.error('Failed to fetch grouped visit data:', err);
                    } finally {
                        set((state) => { state.loading = false });
                    }
                },

                fetchGroupedByDate: async () => {
                    set((s) => { s.loading = true });
                    try {
                        const data = await getVisitsGroupedByDate();
                        set((s) => { s.groupedByDate = data });
                    } catch (e) {
                        console.error('❌ Failed to fetch grouped by date:', e);
                    } finally {
                        set((s) => { s.loading = false });
                    }
                },

                setFilters: (filters) => {
                    set((state) => {
                        state.filters = filters;
                    });
                },

                resetFilters: () => {
                    set((s) => {
                        s.filters = { from: '', to: '', path: '' };
                    });
                },
            })),
            {
                name: 'visitFilters', // se guarda en localStorage con esta key
                partialize: (state) => ({ filters: state.filters }),
            }
        )
    )
);
