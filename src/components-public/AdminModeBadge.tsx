import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(106, 0, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(106, 0, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(106, 0, 255, 0);
  }
`;

export const AdminBadge = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border: 2px solid #6a00ff;
  border-radius: 8px;
  background-color: transparent;
  color: #6a00ff;
  font-weight: 600;
  z-index: 999;
  animation: ${pulse} 2s infinite;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #6a00ff;
    color: #fff;
    cursor: pointer;
  }
`;

export const ReturnLink = styled(Link)`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #6a00ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #4c00b8;
  }
`;
