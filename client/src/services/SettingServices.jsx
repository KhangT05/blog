import api from '@/config/axios';
import { baseSave } from './BaseServices';
const endpoint = 'setting'
const pagination = async () => {
    const response = await api.get(`/${endpoint}/list`);
    return response.data.data;
};
const store = async (payload, action, id) => {
    return baseSave(`/${endpoint}/store`, payload, action, id, {})
}
export {
    pagination,
    store
}