import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavContainer = styled.nav<{ $scrolled: boolean; $hidden: boolean }>`
  width: 100%;
  padding: ${({ $scrolled }) => ($scrolled ? '0.5rem 1.5rem' : '1rem 2rem')};
  background-color: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  position: sticky;
  top: ${({ $hidden }) => ($hidden ? '-80px' : '0')};
  z-index: 99;
  transition: top 0.3s ease, padding 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
  }
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    order: -1;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const StyledLink = styled(Link) <{ $active: boolean }>`
  text-decoration: none;
  color: ${({ theme, $active }) => ($active ? theme.primary : theme.text)};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ToggleTheme = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;

  @media (max-width: 768px) {
    align-self: flex-end;
    margin: 0.4rem 0rem;
  }
`;
