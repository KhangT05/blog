import { setLogin } from "@/redux/slice/authSlice";
import { fetchUser } from "@/services/AuthServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthCheck() {
    const dispatch = useDispatch();
    const [isChecking, setIsChecking] = useState(true);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        const initAuth = async () => {
            if (user) {
                setIsChecking(false);
                return;
            }
            try {
                const userData = await fetchUser();
                if (userData && userData.user) {
                    dispatch(setLogin(userData));
                }
            } catch (error) {
            } finally {
                setIsChecking(false);
            }
        };
        initAuth();
    }, [dispatch, user]);
    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Đang tải...</div>
            </div>
        );
    }
    return <Outlet />;
}

export default AuthCheck;