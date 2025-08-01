export interface Visit {
    _id: string;
    ip: string;
    userAgent: string;
    path: string;
    country?: string;
    city?: string;
    region?: string;
    org?: string;
    createdAt: string;
}

export interface VisitGroupedByPath {
    _id: string;
    count: number;
    lastVisit: string;
}

export interface VisitGroupedByDate {
    _id: string;
    count: number;
}

export interface VisitFilters {
    from?: string;
    to?: string;
    path?: string;
}