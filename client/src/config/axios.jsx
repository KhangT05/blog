import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000/api/v1';
const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});
api.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    const crsfToken = localStorage.getItem('crsfToken');
    if (crsfToken) {
        config.headers['X-CRSF-TOKEN'] = crsfToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
const refreshToken = async () => {
    try {
        const response = await axios.post(`${baseUrl}/auth/refresh`, {}, {
            withCredentials: true
        });
        const data = response.data.data;
        const newaccessToken = data.accessToken;
        const newcrsfToken = data.crsfToken;
        localStorage.setItem('accessToken', newaccessToken);
        if (newcrsfToken) {
            localStorage.setItem('crsfToken', newcrsfToken);
        }
        return newaccessToken;
    } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('crsfToken');
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
                localStorage.setItem('accessToken', newAccessToken);
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