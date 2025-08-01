import { useEffect } from 'react';
import axios from 'axios';

export const useTrackVisit = () => {
    useEffect(() => {
        axios.post(`${import.meta.env.VITE_API_URL}/api/visits`, {
            path: window.location.pathname
        }).catch((err) => {
            console.warn('Failed to track visit', err);
        });
    }, []);
};
