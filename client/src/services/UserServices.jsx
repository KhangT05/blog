import api from '../config/axios'
import { baseSave, updateStatusByField, baseDestroy } from './BaseServices';
const endpoint = 'users';
const pagination = async (queryString = {}) => {
    const response = await api.get('users/list', { queryString });
    return response.data.data
}
const save = async (payload, action, id) => {
    // const response = await api.post('users/store', { payload });
    // console.log(response)
    // return response
    return baseSave(`/${endpoint}/store`, payload, action, id);
}
const updateStatusByUsers = (id, value, column = 'status') => {
    return updateStatusByField(endpoint, id, value, column)
}
// const destroy = async (id) => {
//     const response = await api.delete(`users/destroy/${id}`);
//     return response.data.data
// }
const destroy = async (id, column = 'destroy') => {
    return baseDestroy(endpoint, column, id);
}
export {
    pagination,
    save,
    updateStatusByUsers,
    destroy
}