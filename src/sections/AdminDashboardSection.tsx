import { useEffect, useMemo } from 'react';
import { FaHistory, FaProjectDiagram, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useDashboardStore } from '../store/admin/useDashboardStore';
import { DashboardContainer } from '../styles/admin/DashboardStyles';
import { SectionWrapper } from '../styles/admin/UserOverviewCardStyles';
import { UserOverviewCard } from '../components-admin/UserOverviewCard';
import { UserStatsCard } from '../components-admin/UserStatsCard';
import { RecentActivityFeed } from '../components-admin/RecentActivityFeed';
import { LiveVisitorsDisplay } from '../components-admin/LiveVisitorsCard';

export const AdminDashboardSection = () => {
    const { user } = useAuth();
    const { stats, fetchStats, loading } = useDashboardStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const mappedStats = useMemo(() => {
        if (!stats) return [];

        return [
            { title: 'Projects', value: stats.totalProjects, icon: <FaProjectDiagram /> },
            { title: 'Active Projects', value: stats.activeProjects, icon: <FaSignInAlt /> },
            { title: 'Users', value: stats.totalUsers, icon: <FaHistory /> },
        ];
    }, [stats]);

    return (
        <SectionWrapper>
            <UserOverviewCard />

            <DashboardContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h3 className="mb-3">Welcome, {user?.name || 'Admin'}!</h3>
                <p>This is your dashboard. Here you'll see stats, recent activity, and more.</p>

                {loading ? (
                    <p>Loading stats...</p>
                ) : mappedStats.length > 0 ? (
                    <UserStatsCard stats={mappedStats} />
                ) : (
                    <p>No stats available.</p>
                )}
            </DashboardContainer>

            <RecentActivityFeed />

            <LiveVisitorsDisplay />
        </SectionWrapper>
    );
};
