import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/services/AuthServices";
import { setLogout } from "@/redux/slice/authSlice";
import { Input } from "@/components/ui/input";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
const NavbarRight = () => {
    const [isSearch, setIsSearch] = useState("");
    const { user } = useSelector(state => state.auth);
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <span className="hidden sm:inline">
                            {user ? user.name : 'Tài khoản'}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                    {
                        !user ? (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link to={"/auth/register"} className="flex items-center gap-2 cursor-pointer">
                                        <UserPlus className="w-2 h-2" />
                                        <span>Đăng ký</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to={"/auth/login"} className="flex items-center gap-2 cursor-pointer">
                                        <LogIn className="w-2 h-2" />
                                        <span>Đăng Nhập</span>
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link to={"/profile"} className="flex items-center gap-2 cursor-pointer">
                                        <User className="w-2 h-2" />
                                        <span>Thông tin tài khoản</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="hover:text-[#667eea] hover:cursor-pointer"
                                >
                                    <LogOut className="w-2 h-2" />
                                    <span>Đăng Xuất</span>
                                </DropdownMenuItem>
                            </>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
export default NavbarRight