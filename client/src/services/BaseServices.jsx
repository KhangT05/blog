import api from "@/config/axios";
const baseSave = async (apiURL, payload, action = 'create', id = null) => {
    const formData = new FormData;
    let hasFile = false;
    Object.keys(payload).forEach(key => {
        const value = payload[key];
        if (value instanceof FileList && value.length) {
            if (value.length === 1) {
                formData.append(key, value[0]);
            } else {
                for (let i = 0; i < value.length; i++) {
                    formData.append(`${key}[]`, value[i]);
                }
            }
        } else if (value instanceof File) {
            formData.append(key, value)
        } else {
            formData.append(key, String(value))
        }
    });
    if (action === 'update' && id) {
        formData.append('_method', 'PUT');
        apiURL = `${apiURL}/${id}`
    }
    const headers = {};
    if (hasFile) {
        headers['Content-Type'] = 'multipart/form-data'
    }
    const response = await api.post(apiURL, formData, {
        headers: headers
    });
    return response.data
}
const updateStatusByField = async (models, value, id, column) => {
    const response = await api.put(`/${models}/${id}`, { value, column });
    return response.data
}
const baseDestroy = async (models, column,id) => {
    const response = await api.delete(`/${models}/${column}/${id}`);
    return response.data
}
export {
    baseSave,
    updateStatusByField,
    baseDestroy
}