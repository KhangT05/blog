const pool = require('../config/database');
const store = async (name, guard_name, description) => {
    const checkPermissions = 'SELECT name FROM permissions WHERE name = ?';
    const [rows] = await pool.promise().query(checkPermissions, [name]);
    if (rows.length > 0) {
        throw new Error(`Quyền với tên "${name}" đã tồn tại.`);
    }
    const conn = 'INSERT INTO permissions SET ?';
    const permissionData = { name, guard_name, description: description || null };
    await pool.promise().query(conn, permissionData);
}
const edit = async (id, name, guard_name, description) => {
    const [currentRows] = await pool.promise().query(
        'SELECT id,name,guard_name,description FROM permissions WHERE id = ?', [id]
    )
    if (!currentRows || currentRows.length === 0) {
        throw new Error(`Permission with id ${id} not found.`);
    }
    const current = currentRows[0];
    if (name && name !== current.name) {
        const [nameCheck] = await pool.promise().query(
            'SELECT name FROM permissions WHERE name = ? AND id != ?',
            [name, id]);
        if (nameCheck.length > 0) {
            throw new Error(`Quyền với tên "${name}" đã tồn tại.`);
        }
    }
    const updateData = {
        name: name || current.name,
        guard_name: guard_name || current.guard_name,
        description: description || current.description,
        updated_at: new Date()
    }
    await pool.promise().query('UPDATE permissions SET ? WHERE id = ?', [updateData, id])
}
const getAllPermissions = async (page = 1, limit = 10, keyword) => {
    const offset = (page - 1) * limit;
    let whereConditions = [];
    let queryParams = [];
    let countParams = [];
    if (keyword) {
        whereConditions.push(`(name LIKE ? OR description LIKE ?)`);
        const searchTerm = `%${keyword}%`;
        queryParams.push(searchTerm, searchTerm);
        countParams.push(searchTerm, searchTerm)
    }
    queryParams.push(limit, offset);
    let whereClause = '';
    if (whereConditions.length > 0) {
        whereClause = `WHERE ${whereConditions.join(' AND ')}`
    }
    const selectQuery = `SELECT id,name,description FROM permissions ${whereClause} LIMIT ? OFFSET ?`;
    const countQuery = `SELECT COUNT(id) as count FROM permissions ${whereClause}`;
    const [rows] = await pool.promise().query(selectQuery, queryParams);
    const [[{ count }]] = await pool.promise().query(countQuery, countParams);
    const lastPage = Math.ceil(count / limit);
    const nextPage = page < lastPage ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
    return {
        data: rows,
        total: count,
        currentPage: page,
        lastPage,
        nextPage,
        prevPage
    };
}
const trash = async (id) => {
    const [rows] = await pool.promise().query(
        `SELECT id FROM permissions WHERE id = ?`, [id]
    );
    if (rows.length === 0) {
        throw new Error(`Permission with id ${id} not found.`);
    }
    await pool.promise().query(
        `DELETE FROM permissions WHERE id = ?`, [id]
    )
}
module.exports = {
    store,
    edit,
    getAllPermissions,
    trash
}