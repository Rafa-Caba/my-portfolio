import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Log } from '../../types';
import { getLogs } from '../../services/logs';

interface LogState {
    logs: Log[];
    loading: boolean;
    fetchLogs: () => Promise<void>;
}

export const useLogStore = create<LogState>()(
    devtools(
        immer((set) => ({
            logs: [],
            loading: false,

            fetchLogs: async () => {
                set((s) => { s.loading = true });
                try {
                    const data = await getLogs();
                    set((s) => { s.logs = data });
                } catch (e) {
                    console.error('❌ Error fetching logs:', e);
                } finally {
                    set((s) => { s.loading = false });
                }
            }
        }))
    )
);
