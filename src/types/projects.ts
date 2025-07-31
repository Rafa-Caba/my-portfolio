
export interface Project {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    imagePublicId?: string;
    url: string;
    repoUrl?: string;
    technologies: string[];
    category: string;
    status: 'Active' | 'Inactive' | 'Archived';
    isPublic?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface NewProjectPayload {
    title: string;
    description: string;
    url: string;
    repoUrl?: string;
    technologies: string;
    category: string;
    status: 'Active' | 'Inactive' | 'Archived';
    isPublic: boolean;
    image?: File | null;
}

export interface UpdateProjectPayload {
    title: string;
    description: string;
    url: string;
    repoUrl?: string;
    technologies: string;
    category: string;
    status: 'Active' | 'Inactive' | 'Archived';
    isPublic: boolean;
    image?: File | null;
}

export interface NewProject {
    title: string;
    description: string;
    url: string;
    repoUrl?: string;
    technologies: string;
    category: string;
    status: 'Active' | 'Inactive' | 'Archived';
    isPublic: boolean;
    image?: File | null;
}