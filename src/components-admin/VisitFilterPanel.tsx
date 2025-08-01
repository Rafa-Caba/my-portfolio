import { useState, useEffect } from 'react';
import { useVisitStore } from '../store/admin/useVisitStore';
import { Button, Input, Panel } from '../styles/admin/VisitStyles';
import { motion } from 'framer-motion';

export const VisitFilterPanel = () => {
    const {
        filters,
        setFilters,
        resetFilters,
        fetchRecentVisits,
    } = useVisitStore();

    const [from, setFrom] = useState(filters.from || '');
    const [to, setTo] = useState(filters.to || '');
    const [path, setPath] = useState(filters.path || '');

    // Update local state if persisted filters change
    useEffect(() => {
        setFrom(filters.from || '');
        setTo(filters.to || '');
        setPath(filters.path || '');
    }, [filters]);

    const applyFilters = () => {
        setFilters({ from, to, path });
        fetchRecentVisits();
    };

    const handleReset = () => {
        resetFilters();
        fetchRecentVisits();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Panel>
                <Input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <Input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Path (e.g. /about)"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button onClick={applyFilters}>Apply Filters</Button>
                    <Button $variant="outline-danger" onClick={handleReset}>
                        Reset Filters
                    </Button>
                </div>
            </Panel>
        </motion.div>
    );
};
