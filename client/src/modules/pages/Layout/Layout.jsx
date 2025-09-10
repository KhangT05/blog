import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarLeft from '../Header/NavbarLeft'
import NavbarRight from '../Header/NavbarRight'
const Layout = () => {
  return (
    <>
      <div className='pc-header'>
        <NavbarLeft />
        <NavbarRight />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout