import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'

const Layout = () => {
  return (
    <div>
      <Header />
      <body>
        <Outlet />
      </body>
    </div>
  )
}

export default Layout