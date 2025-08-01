import styled from 'styled-components';

export const ContactWrapper = styled.section`
  padding: 4rem 1rem;
  background-color: ${({ theme }) => theme.backgroundAlt};
  color: ${({ theme }) => theme.text};
`;

export const ContactBox = styled.div`
  max-width: 670px;
  margin: 0 auto;
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

export const ContactItem = styled.p`
  font-size: 2rem;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.primary};
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;

    svg {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.primary};
      font-size: 1.4rem;
    }
  }
`;

export const ContactTitle = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
`;
