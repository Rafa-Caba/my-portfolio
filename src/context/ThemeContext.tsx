// src/context/ThemeContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme/theme';
import { useAuth } from '../hooks/useAuth';
import type { ThemeType } from '../theme/theme';

interface ThemeContextType {
    currentMode: 'light' | 'dark';
    toggleTheme: () => void;
    setMode: (mode: 'light' | 'dark') => void;
    theme: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
    return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        if (user?.personalTheme) {
            setCurrentMode(user.personalTheme === 'light' ? 'light' : 'dark');
        }
    }, [user]);

    const toggleTheme = () => {
        const newMode = currentMode === 'dark' ? 'light' : 'dark';
        setCurrentMode(newMode);
    };

    const setMode = (mode: 'light' | 'dark') => setCurrentMode(mode);

    const theme = currentMode === 'dark' ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ currentMode, toggleTheme, setMode, theme }}>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
