import axios from "axios";
import { showToast } from "./myHelper"
export const handleAxiosError = (error) => {
    if (axios.isAxiosError(error)) {
        showToast('error', error?.response?.data?.message || 'Đăng nhập thất bại.');
    }
    else {
        showToast('error', 'Đã xảy ra lỗi không được xác định. Hãy thử lại sau')
    }
}