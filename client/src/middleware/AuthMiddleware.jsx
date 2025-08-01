import { Navigate, useLocation } from "react-router-dom"


function AuthMiddleware(isAuthenticated,user,children){
    const location = useLocation();
    if(
        !isAuthenticated && 
        !(location.pathname.includes('/login')) ||
        !(location.pathname.includes('/register'))
    )
    {
        return <Navigate to={'/account/login'}/>
    }
    if(
        isAuthenticated && 
        location.pathname.includes('/login')){
        if(user?.role === 'admin'){
            return <Navigate to={'/admin/home'}/>
        }else{
            return <Navigate to={'/'}/>
        }
    }
    if(
        isAuthenticated && 
        user?.role !== 'admin' && 
        location.pathname.includes('/admin'))
    {
        return <Navigate to={'/notFound'}/>
    }
    if(
        isAuthenticated && 
        user?.role === 'admin' && 
        location.pathname.includes('/'))
    {
        return <Navigate to={'/admin/home'} />
    }
    return <> {(children)} </>
}
export default AuthMiddleware