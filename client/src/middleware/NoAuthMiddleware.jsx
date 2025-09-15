import { setLogin } from "@/redux/slice/authSlice";
import { fetchUser } from "@/services/AuthServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";



function NoAuthMiddleware({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [checkedAuth, setcheckedAuth] = useState(false);
    const token = localStorage.getItem('accessToken');
    if (!token) {
        dispatch(setLogout());
        navigate('/login');
        return;
    }
    useEffect(() => {
        const checkAuthenticate = async () => {
            try {
                const userData = await fetchUser();
                if (userData !== null) {
                    dispatch(setLogin(userData));
                    navigate('/');
                } else {
                    setcheckedAuth(true);
                }
            } catch (error) {
                setcheckedAuth(true);
            }
        }
        if (!isAuthenticated || user === null) {
            checkAuthenticate();
        } else {
            navigate('/')
        }
    }, [isAuthenticated, user, dispatch, navigate])
    return checkedAuth ? children : null
}
export default NoAuthMiddleware