const pool = require('../config/database');
const { BadRequestError } = require('../middleware/error.respone')
const store = async (name, description) => {
    const [rows] = await pool.promise().query('SELECT name FROM category WHERE name = ?', [name]);
    if (rows.length > 0) {
        throw new BadRequestError('Danh mục đã tồn tại.');
    }
    const cateData = { name, description: description || null }
    const [result] = await pool.promise().query('INSERT INTO category SET ?', cateData);
    return {
        id: result.insertId,
        name,
        description
    }
}
const edit = async (id,name, description) => {
    const [cc] = await pool.promise().query(
        'SELECT id,name,description FROM category WHERE id = ?',[id]
    )
    if(cc.length === 0 || !cc){
        throw new BadRequestError('')
    }
    const aaa = cc[0];
    if(name !== aaa.name){
        const [kk] = await pool.promise().query(
            'SELECT name FROM category WHERE name = ? OR id != ?',[name,id]
        );
        if(kk.length > 0){
            throw new BadRequestError('')
        }
    }
    const ll = {
        name: name || aaa.name,
        description: description || aaa.description,
        updated_at: new Date()
    }
    await pool.promise().query(
        'UPDATE category SET ? WHERE id = ?',[ll,id]
    )
}
const listCategories = async () => {
    const [rows] = await pool.promise().query(
        'SELECT name FROM category'
    );
    return rows
}
const trash = async (id) => {
    const [rows] = await pool.promise().query(
        'DELETE FROM category WHERE id = ?',[id]
    )
}
module.exports = {
    store,
    listCategories,
    trash
}