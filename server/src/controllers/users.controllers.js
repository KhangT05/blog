const userService = require('../services/admin/users.services');
const { CREATED, OK } = require('../middleware/success.response');
const { BadRequestError } = require('../middleware/error.respone');
class UserController {
    // store = async (req, res) => {
    //     const { name, email, password, phone, gender, role_id } = req.body;
    //     const avatar = req.file;
    //     if (!avatar) {
    //         throw new BadRequestError('Vui lòng chọn ảnh đại diện.')
    //     }
    //     return CREATED(
    //         res,
    //         'Tạo người dùng thành công.',
    //         await userService.store(name, email, password, phone, gender, role_id, avatar.path)
    //     )
    // };
    // getProfile = async (req, res) => {
    //     new OK(
    //         res,
    //         'Lấy thông tin người dùng thành công.',
    //         await userService.getProfile(req.params.id || req.user.sub)
    //     )
    // }
    // uploadAvatar = async (req, res) => {
    //     const avatar = req.file;
    //     if (!avatar) {
    //         throw new BadRequestError('Vui lòng chọn ảnh đại diện.')
    //     }
    //     await userService.uploadAvatar(req.user.sub, avatar.path);
    //     return OK(
    //         res,
    //         'Upload avatar thành công.',
    //         { avatarUrl: avatar.path }
    //     )
    // }
    // editProfile = async (req, res) => {
    //     const { name, email, phone, gender, role } = req.body;
    //     return OK(
    //         res,
    //         'Cập nhật hồ sơ thành công.',
    //         await userService.edit(req.user.sub, name, email, phone, gender, role)
    //     )
    // }
    // listUsers = async (req, res) => {
    //     return OK(
    //         res,
    //         'Danh sách thông tin người dùng',
    //         await userService.listUsers(req.query)
    //     )
    // }
    // updateStatusByField = async (req, res) => {
    //     const id = req.params.id;
    //     return OK(
    //         res,
    //         'Cập nhật trạng thai người dùng thành công.',
    //         await userService.updateStatusByField(req.body.status, id)
    //     )
    // }
    // trash = async (req, res) => {
    //     const { id } = req.params;
    //     const result = await userService.trash(id);
    //     return OK(
    //         res,
    //         'Xoá người dùng hoàn toàn thành công.',
    //         result
    //     )
    // }
    async index(req, res) {
        const { page, perPage, ...otherFilters } = req.query;
        const filter = { ...otherFilters };
        const result = await userService.findAll(filter, {
            page: parseInt(page) || 1,
            perPage: parseInt(perPage) || 10
        });
        return OK(
            res,
            'Lấy record người dùng thành công',
            result
        )
    }
    async store(req, res) {
        const { name, email, phone, password, gender, role_id } = req.body;
        const result = await userService.store({
            name, email, phone, password, gender, role_id
        });
        return CREATED(
            res,
            'Thêm record người dùng thành công',
            result
        )
    }
}
module.exports = new UserController();