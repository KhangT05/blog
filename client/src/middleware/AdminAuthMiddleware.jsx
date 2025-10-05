import { setLogin, setLogout } from "@/redux/slice/authSlice";
import { fetchUser } from "@/services/AuthServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function AdminAuthMiddleware({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [checkedAuth, setcheckedAuth] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            dispatch(setLogout());
            navigate('/login');
            return;
        }
        const checkAuthenticate = async () => {
            try {
                const userData = await fetchUser();
                if (userData !== null) {
                    dispatch(setLogin(userData));
                    if (userData.user.role === 'SUPER ADMIN') {
                        navigate('/admin');
                    }
                    else {
                        navigate('/')
                    }
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
export default AdminAuthMiddleware