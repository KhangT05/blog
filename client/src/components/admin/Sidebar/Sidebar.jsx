import React from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import './sidebar.css'
const Sidebar = () => {
    return (
        <>
            <div className='nav-header'>
                <div className='nav-header__img'>

                </div>
                <ul className='nav-header__content'>
                    <NavLink to='/admin'>
                        Trang chủ
                    </NavLink>
                    <NavLink to={'/admin/setting'}>
                        Quản Lý Hệ Thống
                    </NavLink>
                </ul>
            </div>
        </>
    )
}

export default Sidebar