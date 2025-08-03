import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

export const useTrackVisit = () => {
    const lastPathRef = useRef<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (lastPathRef.current === location.pathname) return;
        lastPathRef.current = location.pathname;

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/visits`, { path: location.pathname, userId: user?.id || undefined })
            .then(() => console.log(''))
            .catch((err) => {
                console.warn('Error:', err);
            });
    }, [location.pathname]);
};