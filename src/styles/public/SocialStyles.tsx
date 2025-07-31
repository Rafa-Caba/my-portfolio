import styled from 'styled-components';

export const SocialWrapper = styled.section`
  padding: 4rem 1rem;
  background-color: ${({ theme }) => theme.backgroundAlt};
  color: ${({ theme }) => theme.text};
`;

export const SocialBox = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

export const SocialTitle = styled.h2`
  margin-bottom: 2rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const SocialItem = styled.a`
  font-size: 4rem;
  color: ${({ theme }) => theme.primary};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.primaryHover || theme.text};
  }
`;
