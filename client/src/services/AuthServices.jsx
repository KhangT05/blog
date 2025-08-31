import api from '@/config/axios'
import { toast } from 'react-toastify';

export const login = async (payload) => {
    try {
        const response = await api.post('/auth/login', {
            email: payload.email,
            password: payload.password
        });
        if (response.data.token) {
            localStorage.setItem('accessToken', response.data.token);
        }
        return {
            user: response.data.user,
            token: response.data.token
        };
    } catch (error) {
        toast.error(error.response?.data?.message || 'Đăng nhập thất bại')
        return null
    }
}
export const fetchUser = async () => {
    try {
        const response = await api.get('/auth/me');
        console.log(response)
        return response.data.user || response.data;
    } catch (error) {
        return null
    }
}