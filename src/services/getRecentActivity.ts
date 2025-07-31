import type { RecentActivity } from '../types';

export const getRecentActivity = async (): Promise<RecentActivity[]> => {
    // Dummy data for now
    return Promise.resolve([
        {
            _id: '1',
            action: 'User logged in',
            createdAt: new Date().toISOString(),
        },
        {
            _id: '2',
            action: 'Project "My Portfolio" updated',
            createdAt: new Date().toISOString(),
        },
    ]);
};