import { Outlet } from 'react-router-dom'
import Aside from '../../components/Aside'
import { useEffect } from 'react'
import { showToast } from '@/helper/myHelper'
import { useSelector } from 'react-redux'
import '../../assets/scss/Style.scss'
const AdminLayout = () => {
  const { message, type } = useSelector((state) => state.toast);
  useEffect(() => {
    showToast(type, message)
  }, [message, type])
  return (
    <div className=''>
      <Aside />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout