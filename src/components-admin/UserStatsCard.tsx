import CountUp from 'react-countup';
import { CardContainer, StatBox, StatLabel, StatValue } from "../styles/admin/DashboardStyles";
import { useTheme } from 'styled-components';

interface Props {
    stats: {
        title: string;
        value: number | string;
        icon?: React.ReactNode;
    }[];
}

export const UserStatsCard = ({ stats }: Props) => {
    const theme = useTheme();

    const getCardStyle = (index: number) => ({
        backgroundColor: index === 0 ? theme.primary : theme.card,
        color: index === 0 ? '#fff' : theme.text,
    });

    return (
        <CardContainer>
            {stats.map((stat, index) => (
                <StatBox key={stat.title} style={getCardStyle(index)}>
                    {stat.icon && <div className="stat-icon">{stat.icon}</div>}
                    <StatValue><CountUp end={stat.value as number} duration={1.5} /></StatValue>
                    <StatLabel>{stat.title}</StatLabel>
                </StatBox>
            ))}
        </CardContainer>
    );
};
