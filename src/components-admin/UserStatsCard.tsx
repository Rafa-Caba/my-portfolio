import CountUp from 'react-countup';
import { CardContainer, StatBox, StatLabel, StatValue } from "../styles/admin/DashboardStyles";
import { useTheme } from 'styled-components';
import { Col, Row } from 'react-bootstrap';

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
            {/* <Row xs={1} lg={3} className="g-3"> */}
            {stats.map((stat, index) => (
                // <Col>
                <StatBox key={stat.title} style={getCardStyle(index)}>
                    {stat.icon && <div className="stat-icon">{stat.icon}</div>}
                    <StatValue><CountUp end={stat.value as number} duration={1.5} /></StatValue>
                    <StatLabel>{stat.title}</StatLabel>
                </StatBox>
                // </Col>
            ))}
            {/* </Row> */}
        </CardContainer>
    );
};
