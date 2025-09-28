import api from '../config/axios'

const pagination = async (queryString = {}) => {
    const response = await api.get('users/list', { queryString });
    return response.data.data
}
// const updateStatus = async (id) => {
//     const response = await api.put()
// }
const destroy = async (id) => {
    const response = await api.delete(`users/destroy/${id}`);
    return response.data.data
}
export {
    pagination,
    destroy
}