import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAutoCenter = () => {
    const [center, setCenter] = useState<[number, number] | null>(null);

    useEffect(() => {
        axios
            .get('https://ipapi.co/json')
            .then((res) => {
                const data = res.data;
                setCenter([data.latitude, data.longitude]);
            })
            .catch(() => setCenter([20, 0])); // fallback
    }, []);

    return center;
};