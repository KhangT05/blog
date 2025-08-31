import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthMiddleware from './middleware/AuthMiddleware'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import AuthLayout from './components/AuthLayout/AuthLayout'
import Layout from './components/Layout/Layout'
import NoAuthMiddleware from './middleware/NoAuthMiddleware'
import { ToastContainer } from 'react-toastify'
import AboutUs from './components/AboutUs/AboutUs'
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
    path: '/dashboard',
    element:
      <AuthMiddleware>
        <Layout />
      </AuthMiddleware>,
    children: [
      { path: 'aboutus', element: <AboutUs /> }
    ]
  },
  // {
  //   path: '/admin',
  //   element:
  //     <NoAuthMiddleware>
  //       <Layout />
  //     </NoAuthMiddleware>
  // },
  {
    path: '*',
    element: <NotFound />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
