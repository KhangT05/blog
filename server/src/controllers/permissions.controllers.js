const permissionService = require('../services/permissions.service');
const store = async (req, res) => {
    try {
        const { name, guard_name, description } = req.body;
        await permissionService.store(name, guard_name, description);
        return res.status(201).json({ message: 'Tạo quyền thành công.' });
    } catch (err) {
        return res.status(500).json({ error: 'Lỗi hệ thống.' });
    }
}
const edit = async () => {

}
module.exports = {
    store
}