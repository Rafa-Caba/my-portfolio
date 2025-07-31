import { Spinner } from 'react-bootstrap';
import { useUserQuery } from '../hooks/useUserQuery';
import { CardWrapper, Email, Name, ProfileImg, Role } from '../styles/admin/UserOverviewCardStyles';

export const UserOverviewCard = () => {
    const { data: user, isLoading } = useUserQuery();

    if (isLoading) return <Spinner animation="border" />;
    if (!user) return <p>User not found</p>;

    return (
        <CardWrapper>
            <ProfileImg src={user.imageUrl} alt="Profile" />
            <div>
                <Name>{user.name}</Name>
                <Role>{user.role}</Role>
                <Email>{user.email}</Email>
            </div>
        </CardWrapper>
    );
};