
export interface DashboardStats {
    totalUsers: number;
    totalProjects: number;
    activeProjects: number;
}

export interface RecentActivity {
    _id: string;
    action: string;
    createdAt: string;
}