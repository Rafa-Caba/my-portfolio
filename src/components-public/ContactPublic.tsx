// src/components-public/ContactPublic.tsx
import { usePublicContext } from '../context/public/PublicContext';
import { Spinner } from 'react-bootstrap';
import { FaEnvelope, FaPhoneAlt, FaUserTie } from 'react-icons/fa';
import {
    ContactWrapper,
    ContactBox,
    ContactItem,
    ContactTitle
} from '../styles/public/ContactStyles';

export const ContactPublic = () => {
    const { publicUser: user, loading } = usePublicContext();

    const showEmail = user?.visibility?.email;
    const showPhone = user?.visibility?.telephone;
    const showName = user?.visibility?.name;
    const showTitle = user?.visibility?.title;

    return (
        <ContactWrapper>
            {loading ? (
                <Spinner animation="border" />
            ) : user ? (
                <ContactBox>
                    <ContactTitle>Contact</ContactTitle>

                    {showName && (
                        <ContactItem>
                            <FaUserTie />
                            {user.name}
                            {showTitle && user.title ? ` — ${user.title}` : ''}
                        </ContactItem>
                    )}

                    {showEmail && (
                        <ContactItem>
                            <FaEnvelope />
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </ContactItem>
                    )}

                    {showPhone && (
                        <ContactItem>
                            <FaPhoneAlt />
                            <a href={`tel:${user.telephone}`}>{user.telephone}</a>
                        </ContactItem>
                    )}
                </ContactBox>
            ) : (
                <p>Contact information is not available at this time.</p>
            )}
        </ContactWrapper>
    );
};
