import { Outlet } from 'react-router-dom'
import Aside from '../../components/Aside'
import { useEffect } from 'react'
import Header from '@/components/header'
import '../../assets/scss/Style.scss'
const AdminLayout = () => {
  return (
    <div className=''>
      <Aside />
      <div className="main-content">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout