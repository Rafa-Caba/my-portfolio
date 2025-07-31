
import CatSvg from '../../assets/cat-icon.svg?react';
import CoffeeSvg from '../../assets/coffee-icon-fixed.svg?react';
import PawSvg from '../../assets/paw-icon.svg?react';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
// import { StyledPaw } from './HeroStyles';

const float = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
`;

const floatReverse = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(10px); }
    100% { transform: translateY(0); }
`;

export const HeroWrapper = styled(motion.section)`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const NameText = styled.h1`
    font-family: 'Pacifico', cursive;
    font-size: 2.8rem;
    margin-top: 1.5rem;
    color: ${({ theme }) => theme.primary};
`;

export const Subtitle = styled.h2`
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 0.5rem;
`;

export const ProfileImage = styled.img`
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${({ theme }) => theme.primary};
`;


export const StyledCat = styled(CatSvg)`
    position: absolute;
    width: 150px;
    fill: ${({ theme }) => theme.text};
    transition: fill 0.3s ease;
    top: 10px;
    left: 20px;
    animation: ${float} 6s ease-in-out infinite;

    @media (max-width: 768px) {
        top: -20px;
        left: 10px;
        width: 80px;
    }
`;

export const StyledPaw = styled(PawSvg)`
    position: absolute;
    width: 150px;
    fill: ${({ theme }) => theme.text};
    transition: fill 0.3s ease;
    top: 10px;
    right: 20px;
    animation: ${float} 6s ease-in-out infinite;

    @media (max-width: 768px) {
        top: -20px;
        right: 10px;
        width: 80px;
    }
`;

export const StyledCoffee = styled(CoffeeSvg)`
  position: absolute;
  width: 200px;
  color: ${({ theme }) => theme.text}; // esto controla el color
  transition: color 0.3s ease;
  top: 370px;
  transform: translateX(-50%);
  animation: ${floatReverse} 6s ease-in-out infinite;
  opacity: ${({ theme }) => theme.mode === 'dark' ? 0.9 : 0.8};

  @media (max-width: 768px) {
    top: 540px;
    width: 80px;
  }

  @media (max-width: 480px) {
    top: 400px;
    width: 200px;
  }
`;