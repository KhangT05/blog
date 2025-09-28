import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarLeft from './Header/NavbarLeft'
import NavbarRight from './Header/NavbarRight'
import Footer from '@/components/footer'
const Layout = () => {
  return (
    <div>
      <div className='pc-header'>
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