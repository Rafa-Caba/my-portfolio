
export interface SiteSettings {
    homepageTagline: string;
    aboutText: string;
    contactEmail: string;
    socialLinks: {
        github: string;
        linkedin: string;
        facebook: string;
    };
    visibility: {
        homepageTagline: boolean;
        aboutText: boolean;
        contactEmail: boolean;
        socialLinks: boolean;
        logoUrl: boolean;
        faviconUrl: boolean;
    };
    logoUrl?: string;
    faviconUrl?: string;
}

export const defaultVisibility = {
    homepageTagline: false,
    aboutText: false,
    contactEmail: false,
    socialLinks: false,
    logoUrl: false,
    faviconUrl: false,
};