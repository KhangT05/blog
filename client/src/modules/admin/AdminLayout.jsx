import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Heading from './header/header'
const breadcrumb = {
  route: '/dashboard'
}
const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 p-4">
          <Heading breadcrumb={breadcrumb} />
          <main className="">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminLayout