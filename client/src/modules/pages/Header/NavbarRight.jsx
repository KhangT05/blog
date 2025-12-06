import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/services/AuthServices";
import { setLogout } from "@/redux/slice/authSlice";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
const NavbarRight = () => {
    const [isSearch, setIsSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const auth = await logout();
        if (auth) {
            dispatch(setLogout(auth))
            navigate('/login');
        }
    }
    return (
        <div className="flex gap-3 items-center cursor-pointer mr-5">
            <div className="relative flex rounded-sm p-1.25 items-center">
                <Input
                    className="flex-1 h-[35px] p-1.25"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setIsSearch(e.target.value)} />
            </div>
            <div className="relative group">
                <Link className="flex cursor-pointer" to={'/profile'}>
                    <User />
                    <span>Thông tin tài khoản</span>
                </Link>
                {/* <div className="absolute w-42 z-50 shadow-lg bg-[#f8f8fc] rounded-lg hidden">
                    <Link className="block">1
                    </Link>
                    <Link>2
                    </Link>
                    <Link>3
                    </Link>
                </div> */}
            </div>
            <button onClick={handleLogout} className="hover:text-[#667eea] hover:cursor-pointer">
                Đăng xuất
            </button>
        </div>
    )
}
export default NavbarRight