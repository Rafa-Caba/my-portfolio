import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AdminRedirect = () => {
    const { user } = useAuth(); // or however you get auth state
    return user ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />;
};