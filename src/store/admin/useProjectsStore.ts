// src/store/admin/useProjectsStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Project } from '../../types';
import {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
} from '../../services/projects';

interface ProjectsState {
    projects: Project[];
    project: Project | null;
    loading: boolean;

    fetchProjects: () => Promise<void>;
    fetchProjectById: (id: string) => Promise<Project | null>;
    addProject: (form: FormData) => Promise<void>;
    editProject: (id: string, form: FormData) => Promise<void>;
    removeProject: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>()(
    devtools(
        immer((set) => ({
            projects: [],
            project: null,
            loading: false,

            fetchProjects: async () => {
                set((state) => { state.loading = true });
                try {
                    const data = await getProjects();
                    set((state) => {
                        state.projects = data;
                    });
                } catch (error) {
                    console.error('❌ Failed to fetch projects:', error);
                } finally {
                    set((state) => { state.loading = false });
                }
            },

            fetchProjectById: async (id) => {
                set((state) => { state.loading = true });
                try {
                    const project = await getProjectById(id);
                    set((state) => {
                        state.project = project;
                    });
                    return project;
                } catch (error) {
                    console.error('❌ Failed to fetch project by id:', error);
                    return null;
                } finally {
                    set((state) => { state.loading = false });
                }
            },

            addProject: async (form) => {
                set((state) => { state.loading = true });
                try {
                    await createProject(form);
                } catch (error) {
                    console.error('❌ Failed to add project:', error);
                } finally {
                    set((state) => { state.loading = false });
                }
            },

            editProject: async (id, form) => {
                set((state) => { state.loading = true });
                try {
                    await updateProject(id, form);
                } catch (error) {
                    console.error('❌ Failed to update project:', error);
                } finally {
                    set((state) => { state.loading = false });
                }
            },

            removeProject: async (id) => {
                set((state) => { state.loading = true });
                try {
                    await deleteProject(id);
                    set((state) => {
                        state.projects = state.projects.filter((p: Project) => p._id !== id);
                    });
                } catch (error) {
                    console.error('❌ Failed to delete project:', error);
                } finally {
                    set((state) => { state.loading = false });
                }
            },
        })),
        { name: 'ProjectsStore' }
    )
);
