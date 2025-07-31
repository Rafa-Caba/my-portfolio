// src/context/AuthContext.tsx
import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/admin/useAuthStore';
import { getUserProfile } from '../services/auth';
import type { User } from '../types';

interface AuthContextProps {
    user: User | null;
    token: string | null;
    loading: boolean;
    logout: () => void;
    fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        user,
        token,
        loading,
        logout,
        setUser,
        setToken,
        setLoading,
    } = useAuthStore();

    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        const storedToken = '';
        if (!storedToken) {
            setLoading(false);
            return;
        }

        try {
            setToken(storedToken);
            const user = await getUserProfile();
            setUser(user);
        } catch (err) {
            logout();
            navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    // Optionally preload on mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, logout, fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuthContext must be used within AuthProvider');
    return context;
};
