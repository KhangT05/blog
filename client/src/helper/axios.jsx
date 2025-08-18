import axios from "axios";

export default function requestApi(endpoint, method, body, responseTpye = 'json') {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin":"*"
  }
  const instance = axios.create({ headers, withCredentials: true });
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;
      if (error.response && error.response.status === 419) {
        originalConfig._retry = true;
        try {
          const result = await instance.post(`${import.meta.env.VITE_APP_API_URL}/auth/refresh`, {
            refreshToken: localStorage.getItem('refreshToken')
          });
          const { accessToken, refreshToken } = result.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
          return instance(originalConfig)
        } catch (err) {
          if (err.response && err.response.status === 400) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/login';
          }
          return Promise.reject(err)
        }
      }
      return Promise.reject(error)
    }
  )
  return instance.request({
    method: method,
    url: `${import.meta.env.VITE_APP_API_URL}${endpoint}`,
    data: body,
    responseType: responseTpye
  })
}