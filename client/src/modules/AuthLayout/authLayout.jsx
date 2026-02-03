import { Link, Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <>
            <div className='bg-[#1E2545] min-h-screen flex flex-col'>
                <div className="pt-6 pb-2">
                    <Link className="flex justify-center" to={'/trang-chu'}>
                        <img src="/vite.svg" alt="Logo"
                            className="h-12 w-auto object-contain" />
                    </Link>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default AuthLayout