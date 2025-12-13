import api from '@/config/axios'
import { toast } from 'sonner';
export const register = async (data) => {
    try {
        const request = await api.post(`/auth/register`, {
            name: data.name,
            email: data.email,
            password: data.password
        });
        toast.success('Đăng ký thành công')
        return {
            user: request.data.user,
        }
    } catch (error) {
        handleAxiosError(error)
        throw error;
    }
}
export const login = async (payload) => {
    try {
        const response = await api.post('/auth/login', {
            email: payload.email,
            password: payload.password
        });
        if (response.data.data.accessToken) {
            localStorage.setItem('accessToken', response.data.data.accessToken);
        }

        toast.success('Đăng nhập thành công')
        return {
            user: response.data.data.user,
            token: response.data.data.accessToken
        };
    } catch (error) {
        toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
        throw error
    }
}

export const fetchUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return {
            user: response.data.data.user
        }
    } catch (error) {
        return null;
    }
}
export const logout = async () => {
    // try {
    const response = await api.post('/auth/logout');
    toast.success("Đăng xuất thành công", 'success')
    return response
    // } catch (error) {
    //     showToast("Đăng xuất thât bại", "error")
    // }
}