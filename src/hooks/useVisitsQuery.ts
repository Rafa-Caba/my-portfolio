import { useQuery } from '@tanstack/react-query';
import { getActiveVisitors } from '../services/visits';
import type { ActiveVisitorsResponse } from '../types';

export const useVisitsQuery = () => {
    return useQuery<ActiveVisitorsResponse>({
        queryKey: ['active-visitors'],
        queryFn: getActiveVisitors,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchInterval: 30000, // auto-refresh every 30s
        staleTime: 1000 * 10, // consider data fresh for 10s
    });
};