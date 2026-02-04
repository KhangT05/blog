import { Link } from "react-router-dom"

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="max-w-md w-full text-center p-10 rounded-2xl shadow-xl">
                <h1 className="text-8xl font-extrabold tracking-widest">403</h1>
                <h2 className="mt-3 text-xl font-medium">Truy cập bị từ chối</h2>
                <p className="mt-4 text-sm leading-relaxed">
                    Bạn không có quyền truy cập vào trang này.
                    <br />
                    Vui lòng quay lại hoặc liên hệ quản trị viên.
                </p>
                <Link to={"/"} className="inline-block mt-8 px-8 py-3 rounded-full bg-white
                 text-blue-700 font-semibold transition hover:bg-gray-200 hover:-translate-y-0.5">
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    )
}

export default Forbidden
