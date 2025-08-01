// components/layout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'

const Layout = () => {
  return (
    <div className='w-full bg-transparent'>
      <div className='max-w-4xl w-full p-4'>
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout