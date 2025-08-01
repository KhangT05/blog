import React from 'react'
import { Outlet,Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-50 w-full'>
        <div className='bg-sky-500'>
            <div className='max-w-7xl mx-auto flex items-center justify-between h-12 mb-10'>
                <div className='text-xl font-medium text-gray-700'>
                    <Link to={'/'}>Trang chủ</Link>
                </div>
                <nav className='flex items-center space-x-4'>
                    <Link to={'/account/login'} className='font-medium'>Đăng nhập</Link>
                    <Link to={'/account/register'} className='font-medium'>Đăng ký</Link>
                </nav>
            </div>
        </div> 
        <main className='mx-auto max-w-4xl px-4 py-8'>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout