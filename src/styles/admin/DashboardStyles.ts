import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DashboardContainer = styled(motion.div)`
  padding: 2rem;
  color: ${({ theme }) => theme.text};

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StatsCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  p {
    margin: 0.25rem 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.card};
    box-shadow: 0 0 12px ${({ theme }) => theme.accent};
    transform: scale(1.03);
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

export const StatBox = styled.div`
  flex: 1 1 140px;
  min-width: 140px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 0.8rem;
  padding: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    background-color: ${({ theme }) => theme.accent};
    color: #fff;

    .stat-icon {
      opacity: 0.9;
    }
  }

  .stat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.primary};
  }
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;
