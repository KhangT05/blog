import { Input } from "@/components/ui/input"
import { useState } from "react";
import { FaSearch } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";
const NavbarRight = () => {
    const [isSearch, setIsSearch] = useState("");
    return (
        <div className="navbar-right">
            <div className="navbar-right__item">
                <Input
                    className="navbar-right__input"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setIsSearch(e.target.value)} />
                {/* <FaSearch className="navbar-right__icon" /> */}
            </div>
            <SlOptionsVertical />
            <div>
                <Link to={"/login"}>Đăng nhập</Link>
            </div>
        </div>
    )
}
export default NavbarRight