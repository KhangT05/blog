import { setLogout } from "@/redux/slice/authSlice";
import { logout } from "@/services/AuthServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        const auth = await logout();
        if (auth) {
            dispatch(setLogout());
            navigate('/login')
        }
    }
    return (
        <>
            <button onClick={handleLogout} className="hover:text-[#667eea] hover:cursor-pointer">
                Đăng xuất
            </button>
        </>
    )
}
export default Header