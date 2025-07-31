import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getPublicUserProfile } from '../../services/users';
import type { User } from '../../types';

interface PublicUserState {
    user: Partial<User> | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
}

export const usePublicUserStore = create<PublicUserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                loading: false,

                fetchUser: async () => {
                    set({ loading: true });
                    try {
                        const data = await getPublicUserProfile();

                        set({ user: data });
                    } catch (error) {
                        console.error('Error fetching public user profile:', error);
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            { name: 'public-user-store' }
        )
    )
);
