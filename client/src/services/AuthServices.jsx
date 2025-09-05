import api from '@/config/axios'
import { handleAxiosError } from '@/helper/axiosHelper';
import { showToast } from '@/helper/myHelper';

export const register = async (data) => {
    try {
        const request = await api.post('/auth/register', {
            name: data.name,
            email: data.email,
            password: data.password
        });
        showToast('success','Đăng ký thành công')
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

        if (response.data.token) {
            localStorage.setItem('accessToken', response.data.token);
        }
        showToast('success', 'Đăng nhập thành công.')
        return {
            user: response.data.user,
            token: response.data.token
        };
    } catch (error) {
        handleAxiosError(error)
        throw error
    }
}

export const fetchUser = async () => {
    try {
        const response = await api.get('/auth/me');
        if (response.data.user) {
            return response.data.user;
        } else {
            return response.data;
        }
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('accessToken');
        }

        return null;
    }
}