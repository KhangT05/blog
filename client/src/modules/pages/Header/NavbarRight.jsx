import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/AuthServices";
import { setLogout } from "@/redux/slice/authSlice";
import { Input } from "@/components/ui/input";
const NavbarRight = () => {
    const [isSearch, setIsSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const auth = await logout();
        console.log(auth)
        if (auth) {
            dispatch(setLogout(auth))
            navigate('/login');
        }
    }
    return (
        <div className="navbar-right">
            <div className="navbar-right__item">
                <Input
                    className="navbar-right__input"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setIsSearch(e.target.value)} />
            </div>
            <button onClick={handleLogout} className="pc-nav__logout">
                Đăng xuất
            </button>
        </div>
    )
}
export default NavbarRight