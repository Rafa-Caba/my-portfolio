import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from 'react-bootstrap';
import { AdminHeader } from '../components-admin/AdminHeader';
import { useSettingsStore } from '../store/admin/useSettingsStore';

interface Props {
    toggleTheme: () => void;
    isDark: boolean;
}

export const AdminLayout = ({ toggleTheme, isDark }: Props) => {
    const { user, loading } = useAuth();
    const { settings } = useSettingsStore();

    useEffect(() => {
        if (!settings) return;

        document.title = 'Admin Portfolio Panel';

        if (!settings.logoUrl) return;

        const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (favicon) {
            favicon.href = settings.logoUrl;
        } else {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = settings.logoUrl;
            document.head.appendChild(link);
        }
    }, [settings]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" />
            </div>
        );
    }

    useEffect(() => {
        document.title = 'Admin Panel | Rafael Portfolio';
        window.scrollTo(0, 0);
    }, []);

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="layout-container m-0 p-0">
            <AdminHeader toggleTheme={toggleTheme} isDark={isDark} />

            <main className="layout-main p-3">
                <Outlet />
            </main>

            {/* <AdminFooter /> */}
        </div>
    );
};
