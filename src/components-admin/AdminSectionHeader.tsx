import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    title: string;
    subtitle?: string;
    buttonLabel?: string;
    buttonTo?: string;
    icon?: ReactNode;
}

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
`;

const Titles = styled.div`
    h2 {
        font-size: 1.8rem;
        margin-bottom: 0.2rem;
    }
    p {
        font-size: 0.95rem;
        color: ${({ theme }) => theme.textSecondary};
    }
`;

export const AdminSectionHeader = ({
    title,
    subtitle,
    buttonLabel,
    buttonTo,
    icon = <FaPlus />,
}: Props) => {
    const navigate = useNavigate();

    return (
        <HeaderWrapper>
            <Titles>
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
            </Titles>

            {buttonTo && buttonLabel && (
                <Button variant="primary" onClick={() => navigate(buttonTo)}>
                    {icon}&nbsp;{buttonLabel}
                </Button>
            )}
        </HeaderWrapper>
    );
};
