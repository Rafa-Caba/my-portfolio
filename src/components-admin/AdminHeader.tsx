// src/components-admin/AdminHeader.tsx
import { useEffect, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
    AdminNavWrapper,
    AdminNavBrand,
    AdminNavLink,
    AdminNavRight,
    ToggleThemeButton,
} from '../styles/admin/AdminNavbarStyles';

interface Props {
    toggleTheme: () => void;
    isDark: boolean;
}

export const AdminHeader = ({ toggleTheme, isDark }: Props) => {
    const { user, logout } = useAuth();
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setHidden(currentY > lastScrollY && currentY > 50);
            setLastScrollY(currentY);
            setScrolled(currentY > 30);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <AdminNavWrapper $scrolled={scrolled} $hidden={hidden} expand="lg" variant="light">
            <Container className='d-flex flex-column flex-md-row' fluid>
                <AdminNavBrand as={NavLink} to="/admin/dashboard">
                    Admin Panel
                </AdminNavBrand>

                <Nav className="d-flex flex-row flex-wrap justify-content-center gap-2 mb-3 mb-md-2 my-2 ms-md-3 me-md-auto">
                    <AdminNavLink to="/admin/dashboard" $active={pathname === '/admin/dashboard'}>
                        Dashboard
                    </AdminNavLink>
                    <AdminNavLink to="/admin/projects" $active={pathname === '/admin/projects'}>
                        Projects
                    </AdminNavLink>
                    <AdminNavLink to="/admin/visits" $active={pathname === '/admin/visits'}>
                        Visits 👀
                    </AdminNavLink>
                    <AdminNavLink to="/admin/settings" $active={pathname === '/admin/settings'}>
                        Settings ⚙️
                    </AdminNavLink>
                    <AdminNavLink
                        to="/"
                        $active={pathname === '/'}
                        onClick={() => localStorage.setItem('cameFromAdmin', 'true')}
                    >
                        Public Site 🌎
                    </AdminNavLink>
                </Nav>

                <AdminNavRight>
                    <span>{user?.name}</span>
                    <ToggleThemeButton onClick={toggleTheme}>
                        {isDark ? '☀️ Light' : '🌙 Dark'}
                    </ToggleThemeButton>
                    <button onClick={logout}>Logout</button>
                </AdminNavRight>
            </Container>
        </AdminNavWrapper>
    );
};
