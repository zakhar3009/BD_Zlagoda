import {useLocation, Outlet, Navigate } from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth.js";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;