import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { useVisitStore } from '../store/admin/useVisitStore';
import { motion } from 'framer-motion';

export const VisitChart = () => {
    const { groupedByDate } = useVisitStore();

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: 300 }}
        >
            <ResponsiveContainer>
                <BarChart data={groupedByDate}>
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
