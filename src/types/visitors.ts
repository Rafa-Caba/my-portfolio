
export interface Visitor {
    ip: string;
    lastSeen: string;
    userAgent?: string;
    path?: string;
}

export interface ActiveVisitorsResponse {
    count: number;
}

export interface VisitorLocation {
    city?: string;
    region?: string;
    country?: string;
    countryCode?: string;
    latitude: number;
    longitude: number;
    lastSeen?: string;
}

export interface HeatPoint {
    lat: number;
    lng: number;
    intensity: number;
}