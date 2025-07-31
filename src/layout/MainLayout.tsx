import { Outlet } from 'react-router-dom';
import { PublicProvider } from '../context/public/PublicContext';
import { Navbar } from '../components/Navbar';
import { ContentWrapper } from '../styles/LayoutStyles';

interface Props {
    toggleTheme: () => void;
    isDark: boolean;
}

export const MainLayout = ({ toggleTheme, isDark }: Props) => {
    return (
        <PublicProvider>
            <Navbar toggleTheme={toggleTheme} isDark={isDark} />
            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
        </PublicProvider>
    );
};