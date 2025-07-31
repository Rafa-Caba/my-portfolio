import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
  padding: 1.5rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  transition: transform 0.3s;
`;

export const EndImage = styled.img`
    margin: 3rem auto;
    display: block;
    max-width: 300px;
    opacity: 0.6;
`;