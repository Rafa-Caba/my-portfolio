import { motion } from 'framer-motion';
import styled from 'styled-components';

export const BioText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  white-space: pre-line;
`;

export const AboutContainer = styled(motion.section)`
    padding: 2rem;
    max-width: 950px;
    margin: auto;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

export const AboutCard = styled.div`
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 1.5rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) {
        flex-direction: row;
        gap: 2rem;
    }
`;

export const AboutImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${({ theme }) => theme.primary};
    margin-bottom: 1rem;

    @media (min-width: 768px) {
        margin-bottom: 0;
    }
`;

export const AboutText = styled.div`
    color: ${({ theme }) => theme.text};
    line-height: 1.7;

    h2 {
        margin-bottom: 1rem;
    }

    h4 {
        margin-top: 2rem;
    }

    p {
        margin-bottom: 1rem;
    }
`;

export const QuickFactsList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-top: 1rem;

    li {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        font-size: 0.95rem;
    }
`;