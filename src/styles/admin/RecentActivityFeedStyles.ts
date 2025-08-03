import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RecentActivityFeedContainer = styled.div`
    padding: 1.5rem;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.cardBackground};
    box-shadow: ${({ theme }) => theme.cardShadow};
    margin-top: 2rem;

    h4 {
        margin-bottom: 1rem;
        font-size: 1.1rem;
        color: ${({ theme }) => theme.textColor};
    }
`;

export const ActivityCard = styled(motion.div)`
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.bgSecondary};
    padding: 0.8rem 1rem;
    border-radius: 10px;
    margin-bottom: 0.75rem;
    box-shadow: ${({ theme }) => theme.cardHoverShadow};

    .activity-icon {
        margin-right: 0.8rem;
        color: ${({ theme }) => theme.primary};
        font-size: 1.2rem;
    }

    .activity-content {
        .activity-text {
            font-size: 0.95rem;
            margin: 0;
            color: ${({ theme }) => theme.textColor};
        }

        .activity-time {
            font-size: 0.75rem;
            color: ${({ theme }) => theme.textMuted};
        }
    }
`;
