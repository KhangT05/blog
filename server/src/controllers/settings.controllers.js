const settingServices = require("../services/settings.services");
const { OK, CREATED } = require('../middleware/success.response');
const store = async (req, res) => {
    return CREATED(
        res,
        'Tạo setting thành công',
        await settingServices.store(req.body),
    )
}
const pagination = async (req, res) => {
    return OK(
        res,
        'Settings fetched successfully',
        await settingServices.pagination(),
    )
}
const edit = async (req, res) => {
    const { id } = req.params;
    return OK(
        res,
        'Settings fetched successfully',
        await settingServices.edit(id, req.body),
    )
}
module.exports = {
    store,
    pagination,
    edit
}