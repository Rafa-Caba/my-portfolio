import styled from 'styled-components';

export const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.skeleton || '#e0e0e0'};
  border-radius: 0.5rem;
  height: 100px;
  width: 100%;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }
`;
