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
import Sangtac from './modules/pages/Thaoluan'
import AdminLayout from './modules/admin/AdminLayout'
import Setting from './modules/admin/system/index'
import Users from './modules/admin/users/screen/index'
import SaveUser from './modules/admin/users/screen/save'
import './index.css'
import Profile from './modules/pages/Users/Profile'
import Thaoluan from './modules/pages/Thaoluan'
const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children:
            [
                { path: '/trang-chu', Component: Layout },
                { path: '/thao-luan', Component: Thaoluan },
                { path: '/profile', Component: Profile, middleware: [AuthMiddleware] }
            ]
    },
    {
        path: '/login', Component: Login
    },
    {
        path: '/register', Component: Register
    },
    {
        path: '/admin',
        middleware: [AuthMiddleware],
        Component: AdminLayout,
        children: [
            { path: 'settings', Component: Setting },
            { path: 'users/index', Component: Users },
            { path: 'users/store', Component: SaveUser }
        ]
    },
    {
        path: '*',
        Component: <NotFound />
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
