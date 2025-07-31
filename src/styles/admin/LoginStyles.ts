import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import styled, { keyframes } from 'styled-components';
import CatSvg from '../../assets/cat-icon.svg?react';
import CoffeeSvg from '../../assets/coffee-icon-fixed.svg?react';

export const LoginIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const CenteredContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? '#123b7e' : '#a6d5ff'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 3rem 1rem 2rem;
  animation: fadeIn 0.6s ease-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 0;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const GlassCard = styled(Card)`
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.text};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 1;
  animation: slideUp 0.4s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const spinFadeHorizontal = keyframes`
  0% {
    opacity: 0;
    transform: rotateY(0deg) scale(0.5);
  }
  25% {
    opacity: 1;
    transform: rotateY(180deg) scale(1.1);
  }
  50% {
    opacity: 0;
    transform: rotateY(360deg) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: rotateY(360deg) scale(0.5);
  }
`;

export const LoginAnimatedIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100px;
  margin-bottom: 1.5rem;
`;

export const StyledLoginCoffee = styled(CoffeeSvg)`
  width: 120px;
  animation: ${spinFadeHorizontal} 6s ease-in-out infinite;
  animation-delay: 0s;
  opacity: 0;
  fill: ${({ theme }) => theme.text};
  transform-style: preserve-3d;
`;

export const StyledLoginCat = styled(CatSvg)`
  width: 120px;
  animation: ${spinFadeHorizontal} 6s ease-in-out infinite;
  animation-delay: 3s;
  opacity: 0;
  fill: ${({ theme }) => theme.text};
  transform-style: preserve-3d;
`;

export const IconFlipWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  perspective: 1000px;
`;

const flipHorizontal = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

export const FlipInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
  animation: ${flipHorizontal} 6s infinite;
`;

export const FlipFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 80%;
    height: auto;
    fill: ${({ theme }) => theme.text};
  }
`;

export const FlipBack = styled(FlipFace)`
  transform: rotateY(180deg);
`;

export const LoginTagline = styled.p`
  text-align: center;
  margin-top: 0.8rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  opacity: 0.8;
`;

export const GlowingLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    text-shadow: 0 0 8px ${({ theme }) => theme.primary || '#4dabf7'};
    color: ${({ theme }) => theme.primary || '#4dabf7'};
  }
`;

export const AuthSwitchLink = styled.button`
  background: transparent;
  border: none;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    color: ${({ theme }) => theme.primary};
    text-shadow: 0 0 8px ${({ theme }) => theme.primary};
  }

  &:focus {
    outline: none;
  }
`;

export const ToggleTheme = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 8px ${({ theme }) => theme.primary || '#00f'};
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    font-size: 0.9rem;
  }
`;