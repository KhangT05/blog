const { CREATED, OK } = require('../middleware/success.response');
const permissionService = require('../services/permissions.service');
const store = async (req, res) => {
    const { name,guard_name, description } = req.body
    new CREATED({
        message: 'Tạo quyền thành công.',
        metaData: await permissionService.store(name,guard_name, description)
    }).send(res)
}
const edit = async (req, res) => {
    const { name,guard_name, description } = req.body;
    new OK({
        message:'Cập nhật quyền thành công.',
        metaData:await permissionService.edit(req.params.id,name,guard_name,description)
    }).send(res)
}
const listPermissions = async (req, res) => {
    const { page = 1, limit = 10, keyword = '' } = req.query;
    new OK({
        metaData: await permissionService.listPermissions(parseInt(page),parseInt(limit),keyword)
    }).send(res)
}
const trash = async (req, res) => {
    new OK({
        message:'Xóa quyền thành công.',
        metaData: await permissionService.trash(req.params.id)
    }).send(res)
}
module.exports = {
    store,
    trash,
    edit,
    listPermissions
}