import { motion } from "framer-motion";
import styled from "styled-components";

export const LiveVisitorsCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.cardBackground};
  padding: 0.75rem 1.25rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: auto;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  width: fit-content;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  .live-dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: #2ecc71;
    box-shadow: 0 0 10px #2ecc71;
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.3);
      opacity: 1;
    }
  }
`;