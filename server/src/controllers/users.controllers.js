const userService = require('../services/users.services');
const { CREATED, OK } = require('../middleware/success.response');
const { BadRequestError } = require('../middleware/error.respone');
const store = async (req, res) => {
    const { name, email, password, phone, gender, role } = req.body;
    const avatar = req.file;
    if (!avatar) {
        throw new BadRequestError('Vui lòng chọn ảnh đại diện.')
    }
    new CREATED({
        message: 'Tạo người dùng thành công.',
        metaData: await userService.store(name, email, password, phone, gender, role, avatar.path)
    }).send(res)
};
const getProfile = async (req, res) => {
    new OK({
        message: 'Lấy thông tin người dùng thành công.',
        metaData: await userService.getProfile(req.params.id || req.user.sub)
    }).send(res)
}
const uploadAvatar = async (req, res) => {
    const avatar = req.file;
    if (!avatar) {
        throw new BadRequestError('Vui lòng chọn ảnh đại diện.')
    }
    await userService.uploadAvatar(req.user.sub, avatar.path);
    new OK({
        message: 'Upload avatar thành công.',
        metaData: { avatarUrl: avatar.path }
    }).send(res)
}
const editProfile = async (req, res) => {
    const { name, email, phone, gender, role } = req.body;
    new OK({
        message: 'Cập nhật hồ sơ thành công.',
        metaData: await userService.edit(req.user.sub, name, email, phone, gender, role)
    }).send(res)
}
const listUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const keyword = req.query.keyword || '';
    const filter = req.query.filter || '';
    const result = await userService.listUsers(page, limit, keyword, filter);
    new OK({
        message: '',
        metaData: result
    })
}
const deletedU = async (req, res) => {
    const id = req.params.id;
    new OK({
        message: 'Xoá mềm người dùng thành công.',
        metaData: await userService.deleted(id)
    })
}
const trash = async (req, res) => {
    const id = req.params.id;
    new OK({
        message: 'Xoá người dùng hoàn toàn thành công.',
        metaData: await userService.trash(id)
    })
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
