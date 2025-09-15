import { setLogin, setLogout } from "@/redux/slice/authSlice";
import { fetchUser } from "@/services/AuthServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
function AuthMiddleware({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            dispatch(setLogout());
            navigate('/login');
            return;
        }
        const checkAuthenticate = async () => {
            if (user === null || !isAuthenticated) {
                const userData = await fetchUser();
                if (userData) {
                    dispatch(setLogin(userData));
                }
                else {
                    dispatch(setLogout());
                    navigate('/admin');
                }
            }
        }
        checkAuthenticate();

    }, [dispatch, navigate, isAuthenticated, user]);
    return isAuthenticated && user ? children : null
}
export default AuthMiddleware