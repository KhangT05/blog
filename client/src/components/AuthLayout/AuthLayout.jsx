import React from 'react'
import './AuthLayout.css'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__card'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout