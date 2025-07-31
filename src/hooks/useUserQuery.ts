import { useQuery } from '@tanstack/react-query';
import type { User } from '../types';
import { getUserProfile } from '../services/auth';

export const useUserQuery = () => {
    return useQuery<User>({
        queryKey: ['usuario'],
        queryFn: getUserProfile,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });
};