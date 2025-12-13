const settingServices = require("../services/admin/settings.services");
const { OK, CREATED } = require('../middleware/success.response');
// const store = async (req, res) => {
//     return CREATED(
//         res,
//         'Tạo setting thành công',
//         await settingServices.store(req.body),
//     )
// }
// const pagination = async (req, res) => {
//     return OK(
//         res,
//         'Settings fetched successfully',
//         await settingServices.pagination(),
//     )
// }
// const edit = async (req, res) => {
//     const { id } = req.params;
//     return OK(
//         res,
//         'Settings fetched successfully',
//         await settingServices.edit(id, req.body),
//     )
// }
// module.exports = {
//     store,
//     pagination,
//     edit
// }
class SettingsController {
    async store(req, res) {
        const { site_name, site_email, site_phone, site_address, site_social } = req.body;
        const result = await settingServices.store({
            site_name, site_email, site_phone, site_address, site_social
        });
        return CREATED(
            res,
            'Tạo record settings cho hệ thống thành công',
            result
        )
    }
}
module.exports = new SettingsController();