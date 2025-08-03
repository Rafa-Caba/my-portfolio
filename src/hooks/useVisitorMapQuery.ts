import { useQuery } from '@tanstack/react-query';
import { getVisitorMap } from '../services/visitors';
import type { VisitorLocation } from '../types';

export const useVisitorMapQuery = () => {
    return useQuery<VisitorLocation[]>({
        queryKey: ['visitor-locations'],
        queryFn: getVisitorMap,
        refetchInterval: 30000,
        staleTime: 10000,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
