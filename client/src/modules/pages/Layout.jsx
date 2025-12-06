import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarLeft from './Header/NavbarLeft'
import NavbarRight from './Header/NavbarRight'
import Footer from '@/components/footer'
const Layout = () => {
  return (
    <div>
      <div className='flex justify-between items-center h-[60px] px-2 py-3 bg-[#f6f7f8] font-medium'>
        <NavbarLeft />
        <NavbarRight />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout