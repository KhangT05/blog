const userService = require('../services/users.services');
const { CREATED, OK } = require('../middleware/success.response');
const { BadRequestError } = require('../middleware/error.respone');
const store = async (req, res) => {
    const { name, email, password, phone, gender, role } = req.body;
    const avatar = req.file;
    if (!avatar) {
        throw new BadRequestError('Vui lòng chọn ảnh đại diện.')
    }
    return CREATED(
        res,
        'Tạo người dùng thành công.',
        await userService.store(name, email, password, phone, gender, role, avatar.path)
    )
};
const getProfile = async (req, res) => {
    new OK(
        res,
        'Lấy thông tin người dùng thành công.',
        await userService.getProfile(req.params.id || req.user.sub)
    )
}
const uploadAvatar = async (req, res) => {
    const avatar = req.file;
    if (!avatar) {
        throw new BadRequestError('Vui lòng chọn ảnh đại diện.')
    }
    await userService.uploadAvatar(req.user.sub, avatar.path);
    return OK(
        res,
        'Upload avatar thành công.',
        { avatarUrl: avatar.path }
    )
}
const editProfile = async (req, res) => {
    const { name, email, phone, gender, role } = req.body;
    return OK(
        res,
        'Cập nhật hồ sơ thành công.',
        await userService.edit(req.user.sub, name, email, phone, gender, role)
    )
}
const listUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await userService.listUsers(page, limit);
    return OK(
        res,
        'Users retrieved successfully',
        result
    )
}
const deletedU = async (req, res) => {
    const id = req.params.id;
    return OK(
        res,
        'Xoá mềm người dùng thành công.',
        await userService.deleted(id)
    )
}
const trash = async (req, res) => {
    const id = req.params.id;
    new OK(
        res,
        'Xoá người dùng hoàn toàn thành công.',
        await userService.trash(id))
}
module.exports = {
    store,
    getProfile,
    uploadAvatar,
    editProfile,
    listUsers,
    deletedU,
    trash
};
