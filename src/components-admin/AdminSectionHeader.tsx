import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderWrapper, Titles } from '../styles/ProjectsStyles';

interface Props {
    title: string;
    subtitle?: string;
    buttonLabel?: string;
    buttonTo?: string;
    icon?: ReactNode;
}

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
                <Button className='align-self-end align-self-md-center' variant="primary" onClick={() => navigate(buttonTo)}>
                    {icon}&nbsp;{buttonLabel}
                </Button>
            )}
        </HeaderWrapper>
    );
};
