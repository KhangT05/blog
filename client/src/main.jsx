import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
const queryClient = new QueryClient()


import AuthMiddleware from './middleware/AuthMiddleware'
import NotFound from './modules/NotFound/NotFound'
import Login from './modules/AuthLayout/Login'
import Register from './modules/AuthLayout/Register'
import Layout from './modules/pages/Layout'

import AdminLayout from './modules/admin/AdminLayout'
import Setting from './modules/admin/system/index'
import Users from './modules/admin/user/screen/index'
import SaveUser from './modules/admin/user/screen/save'
import './index.css'
import Profile from './modules/pages/Profile'
import Thaoluan from './modules/pages/Thaoluan'
import AuthLayout from './modules/AuthLayout/authLayout'
import Home from './modules/pages/Home'
import Chude from './modules/pages/Chude'
import AdminHome from './modules/admin/Home'
import ProtectedMiddleware from './middleware/ProtectedMiddleware'
import AuthCheck from './middleware/AuthCheck'
import NoAuthMiddleware from './middleware/NoAuthMiddleware'
import Forbidden from './modules/NotFound/Forbidden'
const router = createBrowserRouter([
    {
        element: <AuthCheck />,
        children:
            [
                {
                    path: '/',
                    Component: Layout,
                    children: [
                        { index: true, element: <Navigate to={"/trang-chu"} replace /> },
                        { path: '/trang-chu', Component: Home },
                        { path: '/thao-luan', Component: Thaoluan },
                        {
                            element: <ProtectedMiddleware />,
                            children: [
                                { path: '/profile', Component: Profile, },
                                { path: '/chu-de', Component: Chude },
                            ]
                        }
                    ]
                },

            ]
    },
    {
        path: '/auth',
        element: <NoAuthMiddleware />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: 'login', Component: Login },
                    { path: 'register', Component: Register },
                ]
            }
        ]
    },
    {
        path: '/admin',
        element: <AuthMiddleware />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    { index: true, element: <Navigate to={"/admin"} replace /> },
                    { path: 'home', Component: AdminHome },
                    { path: 'settings', Component: Setting },
                    { path: 'users/index', Component: Users },
                    { path: 'users/store', Component: SaveUser }
                ]
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    },
    {
        path: '/403',
        Component: Forbidden
    }
]);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Toaster position="top-right" richColors />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </Provider>
    </StrictMode>
)
