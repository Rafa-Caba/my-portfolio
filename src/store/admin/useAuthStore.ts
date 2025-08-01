// src/store/useAuthStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
    getUserProfile,
    loginUser,
    refreshToken,
    registerUser,
} from '../../services/auth';
import type {
    User,
    LoginPayload,
} from '../../types';
import { showErrorToast } from '../../utils/showToast';

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;

    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: FormData) => Promise<void>;
    logout: () => void;

    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setLoading: (value: boolean) => void;
    refresh: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                token: null,
                loading: false,

                setUser: (user) => set({ user }),
                setToken: (token) => set({ token }),
                setLoading: (val) => set({ loading: val }),

                logout: () => {
                    set({ user: null, token: null });
                },

                login: async (payload) => {
                    set({ loading: true });
                    try {
                        const { token, user } = await loginUser(payload);

                        set({ user, token });
                    } catch (err) {
                        throw err;
                    } finally {
                        set({ loading: false });
                    }
                },

                register: async (payload) => {
                    set({ loading: true });
                    try {
                        const user = await registerUser(payload);
                        set({ user });
                    } catch (err) {
                        showErrorToast('Registration failed.');
                    } finally {
                        set({ loading: false });
                    }
                },

                refresh: async () => {
                    set({ loading: true });
                    try {
                        const { accessToken } = await refreshToken();
                        set({ token: accessToken });

                        const user = await getUserProfile();
                        set({ user });

                        return true;
                    } catch (error) {
                        showErrorToast('Session expired. Please login again.');
                        get().logout();
                        return false;
                    } finally {
                        set({ loading: false });
                    }
                }
            }),
            {
                name: 'AuthStore',
                partialize: (state) => ({
                    user: state.user,
                    token: state.token,
                }),
            }
        )
    )
);
