import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarLeft from '../Navbar/NavbarLeft'
const Layout = () => {
  return (
    <>
      <NavbarLeft />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout