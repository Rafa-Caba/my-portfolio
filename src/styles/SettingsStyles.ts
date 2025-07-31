import styled from 'styled-components';

export const SettingsWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const SettingsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;
