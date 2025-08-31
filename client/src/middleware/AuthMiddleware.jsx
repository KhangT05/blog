import { setLogin, setLogout } from "@/redux/slice/authSlice";
import { fetchUser } from "@/services/AuthServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
function AuthMiddleware({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    useEffect(() => {
        const checkAuthenticate = async () => {
            if (user === null || !isAuthenticated) {
                const userData = await fetchUser();
                if (userData) {
                    dispatch(setLogin(userData));
                }
                // else {
                //     dispatch(setLogout());
                //     navigate('/admin');
                // }
            }
        }
        checkAuthenticate();

    }, [dispatch, navigate, isAuthenticated, user]);
    return children
}
export default AuthMiddleware