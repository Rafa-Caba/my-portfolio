import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.card};
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
`;

export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

export const Role = styled.p`
  margin: 0;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
`;

export const Email = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const SectionWrapper = styled.section`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;