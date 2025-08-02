import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RedirectReset = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('cameFromAdmin');
        navigate('/');
    }, [navigate]);

    return null;
};