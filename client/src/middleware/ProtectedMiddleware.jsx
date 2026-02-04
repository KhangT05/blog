import { setLogin, setLogout } from "@/redux/slice/authSlice";
import { fetchUser } from "@/services/AuthServices";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom"
function ProtectedMiddleware() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { user, isAuthenticated } = useSelector(state => state.auth);
    useEffect(() => {
        const checkAuthenticate = async () => {
            if (user && isAuthenticated) {
                setIsLoading(false);
                return;
            }
            try {
                const userData = await fetchUser();
                if (userData && userData.user) {
                    dispatch(setLogin(userData));
                }
            } catch (error) {
            }
            finally {
                setIsLoading(false);
            }
        }
        checkAuthenticate();
    }, [navigate, isAuthenticated, user,]);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Đang kiểm tra đăng nhập...</div>
            </div>
        );
    }
    if (!user && !isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }
    return <Outlet />
}
export default ProtectedMiddleware