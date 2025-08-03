export interface BaseLog {
    _id: string;
    action: string;
    createdAt: string;
}

export interface RecentActivity extends BaseLog {
    targetModel: string;
}

export interface Log extends BaseLog {
    ip?: string;
    method?: string;
    path?: string;
    user: {
        _id: string;
        name: string;
        email: string;
        image?: string;
    };
    userAgent: string;
}