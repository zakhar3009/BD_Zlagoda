import {useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        allowedRoles.includes(auth?.user?.role)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;