import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()



import AuthMiddleware from '@/middleware/AuthMiddleware'
import NotFound from '@/components/NotFound/NotFound'
import Login from '@/components/AuthLayout/Login/Login'
import Register from '@/components/AuthLayout/Register/Register'
import AuthLayout from '@/components/AuthLayout/AuthLayout'
import Layout from '@/pages/Layout/Layout'
import NoAuthMiddleware from '@/middleware/NoAuthMiddleware'
import AboutUs from '@/pages/AboutUs/AboutUs'
import AdminLayout from '@/components/admin/AdminLayout'
import Index from './components/admin/system/Index'





import './index.css'

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '/danh-sach',
    element:
      <AuthMiddleware>
        <Layout />
      </AuthMiddleware>,
    children:
      [
        { path: 'aboutus', element: <AboutUs /> },
        {
          path: 'thao-luan', element: <Layout />,
        },
        { path: 'huong-dan-dang-truyen', element: <Layout /> }
      ]
  },
  {
    path: '/admin',
    element:
      // <NoAuthMiddleware>
      <AdminLayout />,
    // </NoAuthMiddleware>
    children: [
      { path: 'setting', element: <Index /> }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
