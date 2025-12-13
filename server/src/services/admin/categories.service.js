const pool = require('../../config/database');
const { BadRequestError, ConFlictRequestError, NotFoundRequestError } = require('../../middleware/error.respone');
const store = async (name, description, slug) => {
    const [rows] = await pool.promise().query('SELECT name FROM categories WHERE name = ?', [name]);
    if (rows.length > 0) {
        throw new ConFlictRequestError('Danh mục đã tồn tại.');
    }
    const cateData = { name, description: description || null, slug }
    const [result] = await pool.promise().query('INSERT INTO categories SET ?', cateData);
    return {
        id: result.insertId,
        name,
        description
    }
}
const edit = async (id, name, description) => {
    const [rows] = await pool.promise().query(
        'SELECT id,name,description FROM categories WHERE id = ?', [id]
    )
    if (rows.length === 0 || !rows) {
        throw new NotFoundRequestError('Danh mục không tồn tại.')
    }
    const current = rows[0];
    if (name !== current.name) {
        const [conflict] = await pool.promise().query(
            'SELECT name FROM categories WHERE name = ? OR id != ?', [name, id]
        );
        if (conflict.length > 0) {
            throw new ConFlictRequestError('Tên danh mục đã được sử dụng.')
        }
    }
    const updatedData = {
        name: name || current.name,
        description: description || current.description,
        updated_at: new Date()
    }
    await pool.promise().query(
        'UPDATE categories SET ? WHERE id = ?', [updatedData, id]
    );
    return {
        id,
        name: updatedData.name,
        description: updatedData.description
    }
}
const listCategories = async () => {
    const [rows] = await pool.promise().query(
        'SELECT name FROM categories'
    );
    return rows
}
const trash = async (id) => {
    await pool.promise().query(
        'DELETE FROM categories WHERE id = ?', [id]
    )
    return { id }
}
module.exports = {
    store,
    edit,
    listCategories,
    trash
}