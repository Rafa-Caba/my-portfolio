import styled, { keyframes } from 'styled-components';

const flare = keyframes`
  0% {
    text-shadow: 0 0 0px rgba(0, 123, 255, 0.8);
  }
  50% {
    text-shadow: 0 0 12px rgba(0, 123, 255, 1), 0 0 18px rgba(0, 123, 255, 0.8);
  }
  100% {
    text-shadow: 0 0 0px rgba(0, 123, 255, 0.8);
  }
`;

export const StyledHeroName = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 3rem;
  margin-top: 1.8rem;
  color: #007bff;
  font-weight: 500;
  text-align: center;
  animation: ${flare} 2.5s infinite ease-in-out;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;
