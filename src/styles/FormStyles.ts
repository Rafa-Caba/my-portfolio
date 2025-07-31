import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const FormCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ThemedFormControl = styled(Form.Control)`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.primaryShadow};
    outline: none;
  }
`;

export const ThemedFormSelect = styled(Form.Select)`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.primaryShadow};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.primaryShadow};
  }

  option {
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
  }
`;

export const ThemedFormLabel = styled(Form.Label)`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
`;

export const ThemedFormCheck = styled(Form.Check)`
  .form-check-input {
    background-color: ${({ theme }) => theme.inputBackground};
    border: 1px solid ${({ theme }) => theme.border};
    &:checked {
      background-color: ${({ theme }) => theme.primary};
      border-color: ${({ theme }) => theme.primary};
    }
    &:focus {
      box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.primaryShadow};
    }
  }

  .form-check-label {
    color: ${({ theme }) => theme.text};
  }
`;