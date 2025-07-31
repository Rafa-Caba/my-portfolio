import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const AdminNavWrapper = styled(Navbar) <{ $scrolled: boolean; $hidden: boolean }>`
  width: 100%;
  position: sticky;
  top: ${({ $hidden }) => ($hidden ? '-80px' : '0')};
  z-index: 999;
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: ${({ $scrolled }) => ($scrolled ? '0.5rem 1.2rem' : '1rem 2rem')};
  transition: all 0.3s ease;
`;

export const AdminNavBrand = styled(Navbar.Brand)`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

export const AdminNavLink = styled(NavLink) <{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.primary : theme.text)};
  margin-right: 1rem;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const AdminNavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  span {
    color: ${({ theme }) => theme.text};
  }

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  @media (max-width: 768px) {
    gap: 2.4rem;
  }
`;

export const ToggleThemeButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  cursor: pointer;
`;
