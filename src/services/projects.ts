import api from '../api/axios.api';
import type { Project } from '../types';

export const getProjects = async (): Promise<Project[]> => {
    const { data } = await api.get<Project[]>('/projects');
    return data;
};

export const getPublicProjects = async (): Promise<Project[]> => {
    const { data } = await api.get<Project[]>('/projects/public-projects');
    return data;
};

export const getProjectById = async (id: string): Promise<Project> => {
    const { data } = await api.get<Project>(`/projects/${id}`);
    return data;
};

export const createProject = async (project: FormData): Promise<Project> => {
    const { data } = await api.post<Project>('/projects', project, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
};

export const updateProject = async (id: string, project: FormData): Promise<Project> => {
    const { data } = await api.put<Project>(`/projects/${id}`, project, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
};

export const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
};