import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();

    /* If the user is not logged in, redirect them to /login */
    return (
        auth?.accessToken
            ? <Outlet />
            : <Navigate to="/login" replace /> 
    );
}

export default RequireAuth;