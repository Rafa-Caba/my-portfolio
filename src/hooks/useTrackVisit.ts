import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const useTrackVisit = () => {
    const location = useLocation();

    useEffect(() => {
        axios
            .post(`${import.meta.env.VITE_API_URL}/api/visits`, {
                path: location.pathname,
            })
            .then(() => console.log('[Visit] Tracked:', location.pathname))
            .catch((err) => {
                console.warn('[Visit] Error:', err);
            });
    }, [location.pathname]);
};