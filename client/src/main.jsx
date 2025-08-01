import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/login'
import NotFound from './pages/notfound'
const router = createBrowserRouter([
  {
    path: '/account/login',
    element: <Login/>
  },{
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
