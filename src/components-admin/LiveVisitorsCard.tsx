import { FaUsers } from 'react-icons/fa';
import { useVisitsQuery } from '../hooks/useVisitsQuery';
import { LiveVisitorsCard } from '../styles/admin/LiveVisitorStyles';

export const LiveVisitorsDisplay = () => {
    const { data, isLoading } = useVisitsQuery();

    return (
        <LiveVisitorsCard
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <span className="live-dot" />
            <FaUsers />
            {isLoading ? 'Loading...' : `Live Visitors: ${data?.count ?? 0}`}
        </LiveVisitorsCard>
    );
};
