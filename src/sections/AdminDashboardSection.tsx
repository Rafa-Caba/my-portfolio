import { FaHistory, FaProjectDiagram, FaSignInAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardContainer } from '../styles/admin/DashboardStyles';
import { UserStatsCard } from '../components-admin/UserStatsCard';
import { UserOverviewCard } from '../components-admin/UserOverviewCard';
import { SectionWrapper } from '../styles/admin/UserOverviewCardStyles';
import { useDashboardStore } from '../store/admin/useDashboardStore';

export const AdminDashboardSection = () => {
    const { user } = useAuth();
    const { stats, fetchStats, loading } = useDashboardStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const mappedStats = stats
        ? [
            { title: 'Projects', value: stats.totalProjects, icon: <FaProjectDiagram /> },
            { title: 'Active Projects', value: stats.activeProjects, icon: <FaSignInAlt /> },
            { title: 'Users', value: stats.totalUsers, icon: <FaHistory /> },
        ]
        : [];

    return (
        <SectionWrapper>
            <UserOverviewCard />
            <DashboardContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h3 className='mb-3'>Welcome, {user?.name || 'Admin'}!</h3>
                <p>This is your dashboard. Here you'll see stats, recent activity, and more.</p>

                {loading ? (
                    <p>Loading stats...</p>
                ) : (
                    <UserStatsCard stats={mappedStats} />
                )}
            </DashboardContainer>
        </SectionWrapper>
    );
};
