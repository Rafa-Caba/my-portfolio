import { motion } from 'framer-motion';
import type { Visit } from '../types/visit';
import { format } from 'date-fns';
import { CardVisit } from '../styles/admin/VisitStyles';
import { capitalizeWords, getFlagEmoji } from '../utils/countryCodes';

interface Props {
    visit: Visit;
}

export const VisitCard = ({ visit }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <CardVisit>
                <p><strong>Page:</strong> <span role="img" aria-label="page">📄</span> {visit.path}</p>
                <p><strong>IP:</strong> {visit.ip}</p>
                <p><strong>Browser:</strong> {visit.userAgent}</p>
                {visit.city && (
                    <p>
                        <strong>Location:</strong>
                        {visit.city},
                        {visit.region} –
                        {visit.country ? (
                            <span title={capitalizeWords(visit.country)}>
                                {getFlagEmoji(visit.country)} {capitalizeWords(visit.country)}
                            </span>
                        ) : (
                            <span title="Unknown Country" style={{ color: 'gray' }}>🏳️ Unknown</span>
                        )}
                    </p>
                )}
                {visit.org && (
                    <p>
                        <strong>ISP:</strong> {visit.org}
                    </p>
                )}
                <p><strong>Visited:</strong> {format(new Date(visit.createdAt), 'PPpp')}</p>
            </CardVisit>
        </motion.div>
    );
};
