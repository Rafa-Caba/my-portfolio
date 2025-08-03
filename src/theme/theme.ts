export const lightTheme = {
    background: '#f0f0f0',       // Light grey background
    text: '#222',                // Almost black for main text
    primary: '#4A90E2',          // Vivid blue for accents
    mode: 'light',
    card: '#e6e9ef',             // Slightly off-white border/contrast
    accent: '#50a7f3',           // Lighter blue accent for highlights
    textSecondary: '#555',       // Subdued grey for secondary text
    colors: {
        skeleton: '#d1d1d1', // soft gray – subtle shimmer
    },
    inputBackground: '#ffffff',     // Crisp white for contrast on light gray background
    border: '#cccccc',              // Soft neutral gray to define inputs
    primaryShadow: 'rgba(74, 144, 226, 0.3)', // Light blue glow matching primary
    backgroundAlt: '#f5f7fa', // a soft, light gray-blue background
    primaryHover: '#357ABD', // Slightly darker than #4A90E2
    textLight: '#4a4a4a',
    cardBackground: '#ffffff',
    textColor: '#1a1a1a',
    cardShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    cardHoverShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    cardBorder: 'rgba(0, 0, 0, 0.05)',
    bgSecondary: '#f9f9fc',     // soft light gray with bluish tint
    textMuted: '#6c757d',       // classic muted gray
};

export const darkTheme = {
    background: '#0b1d3a',       // Deep navy blue
    text: '#f9f9f9',             // Almost white for main text
    primary: '#90CAF9',          // Soft blue for accents
    mode: 'dark',
    card: '#1a3556',             // Blue-gray for elevated card edges
    accent: '#42a5f5',           // Brighter blue for callouts
    textSecondary: '#aaa',       // Light gray for secondary text
    colors: {
        skeleton: '#1f2a3c', // muted navy/blue-gray shimmer
    },
    inputBackground: '#0d1c33',     // Darker blue to sit well on deep navy
    border: '#334a6d',              // Muted blue-gray that defines input boundaries
    primaryShadow: 'rgba(144, 202, 249, 0.25)', // Soft glow for focused fields
    backgroundAlt: '#1e1f25', // a gentle dark tone to contrast the main background
    primaryHover: '#64B5F6', // Slightly bolder than the current #90CAF9
    textLight: '#ddd',
    cardBackground: '#1f1f1f',
    textColor: '#f5f5f5',
    cardShadow: '0 4px 12px rgba(255, 255, 255, 0.05)',
    cardHoverShadow: '0 8px 20px rgba(255, 255, 255, 0.1)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    bgSecondary: 'rgba(255, 255, 255, 0.05)', // for dark with blur
};

export type ThemeType = typeof lightTheme;
