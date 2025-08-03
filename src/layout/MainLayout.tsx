import { Outlet } from 'react-router-dom';
import { PublicProvider } from '../context/public/PublicContext';
import { Navbar } from '../components/Navbar';
import { ContentWrapper } from '../styles/LayoutStyles';
import { useAuth } from '../hooks/useAuth';
import { AdminBadge, ReturnLink } from '../components-public/AdminModeBadge';
import { useTrackVisit } from '../hooks/useTrackVisit';
import { useEffect } from 'react';
import axios from 'axios';

interface Props {
    toggleTheme: () => void;
    isDark: boolean;
}

export const MainLayout = ({ toggleTheme, isDark }: Props) => {
    const { token } = useAuth();

    useTrackVisit();

    useEffect(() => {
        const interval = setInterval(() => {
            axios.post(`${import.meta.env.VITE_API_URL}/api/visitors/ping-visitor`, {
                path: location.pathname,
            });
        }, 30000); // Every 30s

        return () => clearInterval(interval);
    }, [location.pathname]);

    const showReturnToAdmin =
        localStorage.getItem('cameFromAdmin') === 'true' && !!token;

    return (
        <PublicProvider>
            {showReturnToAdmin && (
                <>
                    <ReturnLink to="/admin/dashboard">
                        <AdminBadge>
                            👨‍💻 Admin Mode Active
                        </AdminBadge>
                    </ReturnLink>
                </>
            )}
            <Navbar toggleTheme={toggleTheme} isDark={isDark} />
            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
        </PublicProvider>
    );
};