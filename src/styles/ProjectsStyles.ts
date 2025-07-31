import { Card } from "react-bootstrap";
import styled from "styled-components";

export const Image = styled.img`
  width: 50%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const Title = styled.h3`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

export const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.4;
`;

export const TechContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  font-size: 1.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

export const Links = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: ${({ theme }) => theme.text};
    font-size: 1.2rem;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export const Placeholder = styled.div`
  width: 50%;
  height: 150px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary + '33'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const TechBadge = styled.span`
  background: ${({ theme }) => theme.primary + '22'};
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 1.3rem;
  margin: 0.2rem;
  transition: all 0.2s ease;
  cursor: default;

  &:hover {
    background: ${({ theme }) => theme.primary + '44'};
    transform: scale(1.05);
  }
`;

export const AdminTechBadge = styled.span`
  background-color: ${({ theme }) => theme.primary + '22'};
  color: ${({ theme }) => theme.text};
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin: 0.2rem;
  font-weight: 500;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.accent};
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const StyledCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: ${({ theme }) => theme.primaryShadow};
  background-color: ${({ theme }) => theme.cardBackground};

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .card-title {
    color: ${({ theme }) => theme.text};
  }

  .card-text {
    color: ${({ theme }) => theme.textSecondary};
  }
`;