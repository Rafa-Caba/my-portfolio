import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getPublicProjects } from '../../services/projects';
import type { Project } from '../../types';

interface PublicProjectsState {
    projects: Project[];
    loading: boolean;

    fetchProjects: () => Promise<void>;
}

export const usePublicProjectsStore = create<PublicProjectsState>()(
    devtools(
        persist(
            (set) => ({
                projects: [],
                loading: false,

                fetchProjects: async () => {
                    set({ loading: true });
                    try {
                        const data = await getPublicProjects();
                        set({ projects: data });
                    } catch (error) {
                        console.error('Error fetching public projects:', error);
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            { name: 'public-projects-store' }
        )
    )
);
