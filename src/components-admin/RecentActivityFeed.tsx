import { useEffect } from 'react';
import { useRecentActivityStore } from '../store/admin/useRecentActivityStore';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { FaBolt } from 'react-icons/fa';
import { ActivityCard, RecentActivityFeedContainer } from '../styles/admin/RecentActivityFeedStyles';

export const RecentActivityFeed = () => {
    const { activity, loading, fetchRecentActivity } = useRecentActivityStore();

    useEffect(() => {
        fetchRecentActivity();
    }, []);

    return (
        <RecentActivityFeedContainer>
            <h4>Recent Activity</h4>

            {loading && <p>Loading...</p>}

            <AnimatePresence>
                {activity.map((log) => (
                    <ActivityCard
                        key={log._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                    >
                        <FaBolt className="activity-icon" />
                        <div className="activity-content">
                            <p className="activity-text">
                                ⚡ {log.action} {log.targetModel && <small className="text-muted">({log.targetModel})</small>}
                            </p>

                            <small className="activity-time">
                                {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                            </small>
                        </div>
                    </ActivityCard>
                ))}
            </AnimatePresence>
        </RecentActivityFeedContainer>
    );
};
