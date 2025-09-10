import api from '@/config/axios';
import { handleAxiosError } from '@/helper/axiosHelper';
const listSetting = async () => {
    const response = await api.get('/setting/list');
    return response.data;
};
const store = async (data) => {
    try {
        const response = await api.post('/setting/store', data);
        return response.data
    } catch (error) {
        handleAxiosError(error)
    }
}
export {
    listSetting,
    store
}