
export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    title?: string;
    role: 'Admin' | 'Editor' | 'Viewer';
    imageUrl?: string;
    imagePublicId?: string;
    personalTheme?: string;
    bio?: string;
    active?: boolean;
    telephone?: string;
    visibility: {
        name?: boolean;
        username?: boolean;
        email?: boolean;
        title?: boolean;
        role?: boolean;
        imageUrl?: boolean;
        personalTheme?: boolean;
        bio?: boolean;
        telephone?: boolean;
        quickFacts?: boolean;
    },
    quickFacts?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const userDefaultVisibility = {
    name: false,
    username: false,
    email: false,
    title: false,
    role: false,
    imageUrl: false,
    personalTheme: false,
    bio: false,
    telephone: false,
    quickFacts: false
};
