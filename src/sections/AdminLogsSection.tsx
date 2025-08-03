import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LogCard } from '../components-admin/LogCard';
import { useLogStore } from '../store/admin/useLogsStore';
import { VisitHeader, VisitCardContainer, VisitsContainer } from '../styles/admin/VisitStyles';

export const AdminLogsSection = () => {
    const { logs, fetchLogs } = useLogStore();

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <VisitsContainer>
            <VisitHeader>Activity Logs</VisitHeader>

            <AnimatePresence>
                {logs.map((log) => (
                    <VisitCardContainer
                        key={log._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LogCard log={log} />
                    </VisitCardContainer>
                ))}
            </AnimatePresence>
        </VisitsContainer>
    );
};
