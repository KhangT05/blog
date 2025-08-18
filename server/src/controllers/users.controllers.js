const userService = require('../services/users.services');
const store = async (req, res) => {
    try {
        const { name, email, password, phone, gender } = req.body;
        const avatar = req.file;
        if (!avatar) {
            return res.status(400).json({ error: 'Vui lòng chọn ảnh đại diện.' });
        }
        await userService.store(name, email, password, phone, gender, avatar.path);
        return res.status(201).json({ message: 'Tạo người dùng thành công.' });
    } catch (err) {
        return res.status(500).json({ error: 'Lỗi server.' });
    }
};
const getProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Người dùng không tồn tại.' });
        }
        console.log(req.user)
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server.' });
    }
}
const uploadAvatar = async (req, res) => {
    try {
        const avatar = req.file;
        if (!avatar) {
            return res.status(400).json({ error: 'Vui lòng chọn một ảnh để upload.' });
        }
        await userService.uploadAvatar(req.user.sub, avatar.path);
        return res.status(200).json({
            message: 'Upload avatar thành công.',
            avatarUrl: avatar.path
        });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server.' });
    }
}
const editProfile = async (req, res) => {
    try {
        const { name, email, phone, gender } = req.body;
        await userService.edit(req.user.sub, name, email, phone, gender);
        return res.status(200).json({ message: 'Cập nhật hồ sơ thành công.' });
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Lỗi server.' });
    }
}
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';
        const filter = req.query.filter || '';
        const users = await userService.getMany(page,limit,keyword,filter);
        return res.status(200).json({
            message: keyword ? `Tìm thấy kết quả cho "${keyword}"` : 'Lấy dữ liệu thành công',
            ...users
        });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server.' });
    }
}
const deletedU = async (req, res) => {
    try {
        const id = req.params.id;
        await userService.deleted(id);
        return res.status(200).json({ message: 'Xoá mềm người dùng thành công.' });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server.' });
    }
}
const trash = async (req, res) => {
    try {
        const id = req.params.id;
        await userService.trash(id);
        return res.status(200).json({ message: 'Xoá người dùng hoàn toàn thành công.' });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server.' });
    }
};
module.exports = {
    store,
    getProfile,
    uploadAvatar,
    editProfile,
    getAllUsers,
    deletedU,
    trash
};
