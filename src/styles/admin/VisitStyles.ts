import { motion } from 'framer-motion';
import styled from 'styled-components';

export const VisitsContainer = styled.div`
  padding: 2rem;
`;

export const VisitHeader = styled.h2`
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const CardVisit = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const Panel = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const Button = styled.button<{ $variant?: string }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ $variant }) =>
    $variant === 'outline-danger' ? 'transparent' : '#007bff'};
  color: ${({ $variant }) =>
    $variant === 'outline-danger' ? '#dc3545' : '#fff'};
  border: ${({ $variant }) =>
    $variant === 'outline-danger' ? '1px solid #dc3545' : 'none'};

  &:hover {
    opacity: 0.85;
  }
`;

export const VisitCardContainer = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme }) => theme.cardShadow};
  color: ${({ theme }) => theme.textColor};
  border-radius: 12px;
  padding: 1rem;
  margin: 0.5rem 0;
  transition: box-shadow 0.3s ease;
  backdrop-filter: blur(6px);
  border: 1px solid ${({ theme }) => theme.cardBorder};

  &:hover {
    box-shadow: ${({ theme }) => theme.cardHoverShadow};
    transform: scale(1.01);
  }
`;