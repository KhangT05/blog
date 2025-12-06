const { CREATED, OK } = require('../middleware/success.response');
const categoryServices = require('../services/admin/categories.service');
const store = async (req, res) => {
    const { name, description } = req.body;
    const randomNumber = Math.floor(10000 + Math.random() * 10)
    const slug = `CT${randomNumber}`
    new CREATED({
        message: 'Tạo danh mục thành công.',
        metaData: await categoryServices.store(name, description, slug)
    }).send(res)
}
const edit = async (req, res) => {
    const { name, description } = req.body;
    new OK({
        message: 'Cập nhật danh mục thành công.',
        metaData: await categoryServices.edit(req.params.id, name, description)
    }).send(res)
}
const listCategories = async (req, res) => {
    return OK(
        res,
        '',
        await categoryServices.listCategories()
    )
}
const trash = async (req, res) => {
    new OK({
        message: 'Xóa danh mục thành công.',
        metaData: await categoryServices.trash(req.params.id)
    }).send(res)
}
module.exports = {
    store,
    trash,
    edit,
    listCategories
}