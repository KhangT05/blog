import api from '@/config/axios'

const listUsers = async (queryString = {}) => {
    const response = await api.get('users/list', { queryString });
    return response.data
}
export {
    listUsers
}   