import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
const queryClient = new QueryClient()


import AuthMiddleware from './middleware/AuthMiddleware'
import NotFound from './modules/NotFound/NotFound'
import Login from './modules/AuthLayout/Login/Login'
import Register from './modules/AuthLayout/Register/Register'
import Layout from './modules/pages/Layout'
// import AdminAuthMiddleware from './middleware/AdminAuthMiddleware'
import AdminAuthMiddleware from './middleware/AdminAuthMiddleware'
import Sangtac from './modules/pages/SangTac/index'
import AdminLayout from './modules/admin/AdminLayout'
import Setting from './modules/admin/system/index'
import Users from './modules/admin/users/screen/index'
import SaveUser from './modules/admin/users/screen/save'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/login', element:
            <Login />
    },
    {
        path: '/register', element: <Register />
    },
    {
        path: '/',
        element:
            <AuthMiddleware>
                <Layout />
            </AuthMiddleware>
        ,
        children:
            [
                { path: '/sang-tac', element: <Sangtac /> },
                { path: '/thao-luan/huong-dan-dang-truyen', element: <Layout /> }

            ]
    },
    {
        path: '/admin',
        element:
            // <AdminAuthMiddleware>
            <AdminLayout />
        // </AdminAuthMiddleware >
        ,
        children: [
            { path: 'settings', element: <Setting /> },
            { path: 'users/index', element: <Users /> },
            { path: 'users/store', element: <SaveUser /> }
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
                <Toaster position="top-right" richColors />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </Provider>
    </StrictMode>
)
