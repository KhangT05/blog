import axios from "axios";
const baseUrl = 'http://localhost:3000/api/v1';
const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});
const refreshToken = async () => {
    try {
        const response = await axios.post(`/auth/refresh`, {}, {
            withCredentials: true
        });
        return response.data.data.accessToken
    } catch (error) {
        localStorage.removeItem('accessToken');
        throw new Error('Không thể khởi tạo lại access token')
    }
}
api.interceptors.response.use(
    response => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                localStorage.setItem('accessToken', newAccessToken)
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Accept'] = "application/json";
axios.defaults.headers.common['Content-Type'] = "application/json"
export default api