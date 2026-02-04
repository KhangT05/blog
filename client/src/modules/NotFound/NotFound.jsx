import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center px-6">
                <h1 className="text-[120px] font-extrabold text-gray-800 tracking-widest">
                    404
                </h1>

                <p className="mt-2 text-2xl font-semibold text-gray-700">
                    Không tìm thấy trang
                </p>

                <p className="mt-4 text-gray-500 max-w-md mx-auto">
                    Trang bạn đang tìm có thể đã bị xoá, đổi đường dẫn
                    hoặc tạm thời không tồn tại.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-8 px-8 py-3 rounded-full bg-gray-800 text-white font-medium transition
                     hover:bg-gray-700 hover:-translate-y-0.5"
                >
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    )
}

export default NotFound
