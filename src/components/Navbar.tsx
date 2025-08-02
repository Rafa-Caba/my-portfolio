import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo, NavContainer, NavLinks, StyledLink, ToggleTheme } from '../styles/NavbarStyles';

interface Props {
    toggleTheme: () => void;
    isDark: boolean;
}

export const Navbar = ({ toggleTheme, isDark }: Props) => {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            // Mostrar navbar al subir, ocultar al bajar
            setHidden(currentY > lastScrollY && currentY > 50);
            setLastScrollY(currentY);

            // Cambiar padding si ya se ha scrolleado un poco
            setScrolled(currentY > 30);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <NavContainer $hidden={hidden} $scrolled={scrolled}>
            <Logo>Rafael Cabanillas</Logo>

            <NavLinks>
                <StyledLink to="/" $active={pathname === '/'}>Home</StyledLink>
                <StyledLink to="/projects" $active={pathname === '/projects'}>Projects</StyledLink>
                <StyledLink to="/about" $active={pathname === '/about'}>About me</StyledLink>
                <StyledLink to="/social" $active={pathname === '/social'}>Social Media</StyledLink>
                <StyledLink to="/contact" $active={pathname === '/contact'}>Contact</StyledLink>
            </NavLinks>

            <ToggleTheme onClick={toggleTheme}>
                {isDark ? '☀️ Light' : '🌙 Dark'}
            </ToggleTheme>
        </NavContainer>
    );
};
