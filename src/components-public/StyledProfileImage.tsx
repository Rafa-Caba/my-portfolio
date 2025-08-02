import styled, { keyframes } from 'styled-components';

const pulseRing = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 5px rgba(0, 123, 255, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.5);
  }
`;

export const GlowingProfileWrapper = styled.div`
  display: inline-block;
  border-radius: 50%;
  padding: 6px;
  animation: ${pulseRing} 2.2s infinite ease-in-out;
`;

export const ProfileImage = styled.img`
  display: block;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`;

// width: 180px;
// height: 180px;
// border-radius: 50%;
// object-fit: cover;
// border: 4px solid ${({ theme }) => theme.primary};