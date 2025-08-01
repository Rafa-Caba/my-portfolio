import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useVisitStore } from '../store/admin/useVisitStore';
import { VisitCard } from '../components-admin/VisitCard';
import { VisitCardContainer, VisitHeader, VisitsContainer } from '../styles/admin/VisitStyles';
import { VisitChart } from '../components-admin/VisitChart';
import { VisitFilterPanel } from '../components-admin/VisitFilterPanel';

export const AdminVisitsSection = () => {
    const {
        visits,
        visitCount,
        visitsByPath,
        fetchVisitCount,
        fetchGroupedVisits,
    } = useVisitStore();

    useEffect(() => {
        fetchVisitCount();
        fetchGroupedVisits();
    }, []);

    return (
        <VisitsContainer>
            <VisitHeader>Filters</VisitHeader>
            <VisitFilterPanel />

            <VisitHeader>Total Visits: {visitCount}</VisitHeader>

            <AnimatePresence mode="wait">
                {visits.map((visit) => (
                    <VisitCardContainer
                        key={visit._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <VisitCard visit={visit} />
                    </VisitCardContainer>
                ))}
            </AnimatePresence>

            <VisitHeader>Grouped by Page</VisitHeader>
            <ul>
                {visitsByPath.map((group) => (
                    <li key={group._id}>
                        <strong>{group._id}</strong>: {group.count} visits
                    </li>
                ))}
            </ul>

            <VisitHeader>Visit Trends</VisitHeader>
            <VisitChart />
        </VisitsContainer>
    );
};
