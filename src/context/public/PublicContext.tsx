import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { usePublicUserStore } from '../../store/public/usePublicUserStore';
import { usePublicProjectsStore } from '../../store/public/usePublicProjectsStore';
import { usePublicSettingsStore } from '../../store/public/usePublicSettingsStore';
import type { User, Project, SiteSettings } from '../../types';

interface PublicContextType {
    publicUser: Partial<User> | null;
    publicProjects: Project[];
    publicSettings: Partial<SiteSettings> | null;
    loading: boolean;
}

const PublicContext = createContext<PublicContextType | undefined>(undefined);

export const PublicProvider = ({ children }: { children: ReactNode }) => {
    const { user, fetchUser, loading: userLoading } = usePublicUserStore();
    const { projects, fetchProjects, loading: projectsLoading } = usePublicProjectsStore();
    const { settings, fetchSettings, loading: settingsLoading } = usePublicSettingsStore();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPublicData = async () => {
            await Promise.all([
                fetchUser(),
                fetchProjects(),
                fetchSettings(),
            ]);
            setLoading(false);
        };

        loadPublicData();
    }, []);

    useEffect(() => {
        if (!settings) return;

        // 🌐 Public Site Title
        document.title = 'My Portfolio';

        if (!settings.faviconUrl) return;

        // 🌐 Public Favicon
        const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (favicon) {
            favicon.href = settings.faviconUrl;
        } else {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = settings.faviconUrl;
            document.head.appendChild(link);
        }
    }, [settings]);

    return (
        <PublicContext.Provider
            value={{
                publicUser: user,
                publicProjects: projects,
                publicSettings: settings,
                loading: userLoading || projectsLoading || settingsLoading || loading,
            }}
        >
            {children}
        </PublicContext.Provider>
    );
};

export const usePublicContext = () => {
    const context = useContext(PublicContext);
    if (!context) {
        throw new Error('usePublicContext must be used within a PublicProvider');
    }
    return context;
};
