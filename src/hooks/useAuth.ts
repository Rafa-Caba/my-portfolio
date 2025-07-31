import { useAuthStore } from '../store/admin/useAuthStore';
import type { LoginPayload } from '../types/auth';

export const useAuth = () => {
    const {
        user,
        token,
        loading,
        login,
        register,
        logout,
        refresh,
    } = useAuthStore();

    return {
        user,
        token,
        loading,
        login: (data: LoginPayload) => login(data),
        register: (data: FormData) => register(data),
        logout,
        refresh,
    };
};
