const roleService = require('../services/roles.service');
const store = async (req, res) => {
    try {
        const { name, guard_name, description, permission } = req.body;
        await roleService.store(name, guard_name, description, permission);
        return res.status(201).json({ message: 'Tạo role thành công.' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
const getMany = async (req, res) => {
    try {
        const roles = await roleService.getMany();
        return res.status(200).json({ roles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const updatePermission  = async(req,res)=>{
    const { role,permission } = req.body;
    await roleService.updatePermission(role,permission)
}
const trash = async (req, res) => {
    try {
        await roleService.trash(req.params.id);
        return res.status(200).json({ message: 'Xoá role thành công.' });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi server.' });
    }
}
module.exports = {
    store,
    getMany,
    trash,
    updatePermission
};
