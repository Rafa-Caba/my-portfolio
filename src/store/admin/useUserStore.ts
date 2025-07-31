// src/store/admin/useUserStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { User } from '../../types';
import { changePassword, getUserById, updateUser } from '../../services/users';


interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

interface UserState {
    user: User | null;
    loading: boolean;

    fetchUserById: (id: string) => Promise<User | null>;
    editUser: (id: string, data: FormData) => Promise<void>;
    updatePassword: (data: ChangePasswordData) => Promise<void>;
}

export const useUserStore = create<UserState>()(
    devtools(
        immer((set) => ({
            user: null,
            loading: false,

            fetchUserById: async (id) => {
                set((state) => {
                    state.loading = true;
                });
                try {
                    const user = await getUserById(id);
                    set((state) => {
                        state.user = user;
                    });

                    return user;
                } catch (error) {
                    console.error('❌ Failed to fetch user by id:', error);
                    return null;
                } finally {
                    set((state) => {
                        state.loading = false;
                    });
                }
            },

            editUser: async (id, data) => {
                set((state) => {
                    state.loading = true;
                });
                try {
                    await updateUser(id, data);
                } catch (error) {
                    console.error('❌ Failed to update user:', error);
                } finally {
                    set((state) => {
                        state.loading = false;
                    });
                }
            },

            updatePassword: async (data) => {
                set((state) => {
                    state.loading = true;
                });
                try {
                    await changePassword(data);
                } catch (error) {
                    console.error('❌ Failed to change password:', error);
                } finally {
                    set((state) => {
                        state.loading = false;
                    });
                }
            },
        })),
        { name: 'UserStore' }
    )
);
