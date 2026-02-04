import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const NoAuthMiddleware = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth);
    if (user && isAuthenticated) {
        return <Navigate to="/trang-chu" replace />;
    }
    return <Outlet />;
}
export default NoAuthMiddleware