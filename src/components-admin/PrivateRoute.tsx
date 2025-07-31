import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

interface Props {
    children: JSX.Element;
    allowedRoles?: Array<'Admin' | 'Editor' | 'Viewer'>;
}

export const PrivateRoute = ({ children }: Props) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};
