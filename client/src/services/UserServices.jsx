import api from '../config/axios'
import { baseSave, updateStatusByField, baseDestroy } from './BaseServices';
const endpoint = 'users';
const pagination = async (queryParams = {}) => {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await api.get(`${endpoint}/list?${queryString}`);

    return response.data.data;
};
const save = async (payload, action, id) => {
    return baseSave(`/${endpoint}/store`, payload, action, id);
}
const updateStatusByUsers = (id, value, column = 'status') => {
    return updateStatusByField(endpoint, column, value, id);
}
const destroy = async (id, column = 'destroy') => {
    return baseDestroy(endpoint, column, id);
}
export {
    pagination,
    save,
    updateStatusByUsers,
    destroy
}