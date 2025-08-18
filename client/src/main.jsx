import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/login'
import NotFound from './pages/notfound'
import AuthMiddleware from './middleware/AuthMiddleware'
import Dashboard from './pages/public/dashboard'
const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <Login/>
  },
  {
    path:'/',
    element:
    <AuthMiddleware>
      <Dashboard/>
    </AuthMiddleware>,
    // children:[
      
    // ]
  },
  {
    path:'*',
    element:<NotFound/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
