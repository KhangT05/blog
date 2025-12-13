import { setLogin, setLogout } from "@/redux/slice/authSlice";
import { fetchUser } from "@/services/AuthServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
function AuthMiddleware({ children, requiredRole = null, redirectPath = '/' }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const [isChecking, setIsChecking] = useState(true);
    useEffect(() => {
        const checkAuthenticate = async () => {
            setIsChecking(true);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                dispatch(setLogout());
                setIsChecking(false);
                return navigate('/login');
            }
            if (user === null || !isAuthenticated) {
                const userData = await fetchUser();
                if (userData) {
                    dispatch(setLogin(userData));
                    if (requiredRole !== null && userData.user.role_id !== requiredRole) {
                        navigate(redirectPath);
                    }
                    else {
                        navigate('/')
                    }
                }
                else {
                    dispatch(setLogout());
                    navigate('/login');
                }
            }
        }
        checkAuthenticate();
    }, [dispatch, navigate, isAuthenticated, user, isChecking, requiredRole, redirectPath]);
    return isAuthenticated && user ? children : null
}
export default AuthMiddleware