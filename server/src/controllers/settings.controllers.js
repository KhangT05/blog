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
module.exports = {
    store,
    pagination
}