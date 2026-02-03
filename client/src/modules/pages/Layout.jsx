import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarLeft from './Header/NavbarLeft'
import NavbarRight from './Header/NavbarRight'
import Footer from '@/components/footer'
const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex justify-between items-center
         h-[60px] px-2 py-3 bg-[#f6f7f8] font-medium sticky shadow-sm z-50 top-0'>
        <NavbarLeft />
        <NavbarRight />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout