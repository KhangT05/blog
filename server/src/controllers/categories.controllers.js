const { CREATED, OK } = require('../middleware/success.response');
const categoryServices = require('../services/categories.service');
const store = async (req, res) => {
    const { name, description } = req.body
    new CREATED({
        message: 'Tạo danh mục thành công.',
        metaData: await categoryServices.store(name, description)
    }).send(res)
}
const listCategories = async (req, res) => {
    new OK ({
        metaData: await categoryServices.listCategories()
    }).send(res)
}
module.exports = {
    store,
    listCategories
}