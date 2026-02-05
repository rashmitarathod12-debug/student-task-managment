import { Children } from "react";
import { Navigate, redirect } from "react-router-dom";

const AuthGuard = ({
    children,
    required = true,
    redirect ="/login"
 }) => {
    const logindata =JSON.parse(localStorage.getItem("logindata"));
    const isAuthenticated = !!logindata;

    if (required && !isAuthenticated){
        return <Navigate to={redirect} replace/>
    }

    if (required && !isAuthenticated){
        return <Navigate to="/dashboard" replace/>
    }
    return children;
};
export default AuthGuard;