import { MapContainer } from "react-leaflet";
import styled, { keyframes } from "styled-components";

// Pulse Animation
export const pulse = keyframes`
  0% {
    transform: scale(0.6);
    opacity: 0.6;
  }
  70% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

export const PulseMarker = styled.div`
  width: 20px;
  height: 20px;
  background: #2ecc71;
  border-radius: 50%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: #2ecc71;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

export const StyledMap = styled(MapContainer)`
  height: 400px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;