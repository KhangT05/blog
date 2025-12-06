const pool = require('../../config/database');
const {
    BadRequestError,
    ConFlictRequestError,
    NotFoundRequestError
} = require('../../middleware/error.respone')
const store = async (name, guard_name, description, cat = []) => {
    if (!permission || !Array.isArray(permission) || permission.length === 0) {
        throw new BadRequestError('Phải chọn ít nhất một quyền.');
    }
    const query = 'SELECT id FROM permissions WHERE id IN (?)';
    const [validPermissions] = await pool.promise().query(query, [permission]);
    if (validPermissions.length !== permission.length) {
        throw new BadRequestError('Một hoặc nhiều quyền không hợp lệ.');
    }
    const checkRoles = 'SELECT name FROM roles WHERE name = ?';
    const [rows] = await pool.promise().query(checkRoles, [name]);
    if (rows.length > 0) {
        throw new ConFlictRequestError('Tên role đã tồn tại.');
    }
    const conn = 'INSERT INTO roles SET ?';
    const roleData = { name, guard_name, description: description || null };
    const [result] = await pool.promise().query(conn, roleData);
    const roleId = result.insertId;
    const values = validPermissions.map(p => [roleId, p.id]);
    const insertQuery = `INSERT INTO posts_has_permissions(role_id,permission_id) VALUES ?`
    await pool.promise().query(insertQuery, [values]);
    return {
        id: roleId,
        name,
        guard_name,
        description,
        permissions: permission
    };

}
const getMany = async () => {
    const [rows] = await pool.promise().query(
        'SELECT id, name FROM posts'
    );
    return rows;
}
const updatePermission = async (postId, permission = []) => {
    const [checkRoles] = await pool.promise().query(`
        SELECT id FROM posts WHERE id = ?
    `, [roleId]);
    if (checkRoles.length === 0) {
        throw new NotFoundRequestError('Role không tồn tại.')
    }
    await pool.promise().query(`
        DELETE FROM roles_has_permissions WHERE role_id = ?
    `, [roleId])
    if (permission.length > 0 && Array.isArray(permission)) {
        const query = 'SELECT id FROM permissions WHERE id IN (?)';
        const [validPermissions] = await pool.promise().query(query, [permission]);
        if (validPermissions.length !== permission.length) {
            throw new BadRequestError('Một hoặc nhiều quyền không hợp lệ.');
        }
        const values = validPermissions.map(p => [roleId, p.id]);
        const insertQuery = `INSERT INTO roles_has_permissions(role_id,permission_id) VALUES ?`
        await pool.promise().query(insertQuery, [values]);
    }
    return {
        roleId,
        updatedPermissions: permission
    }
}
const trash = async (id) => {
    const conn = 'DELETE FROM roles WHERE id = ?';
    await pool.promise().query(conn, [id]);
    return { id }
}
module.exports = {
    store,
    getMany,
    trash,
    updatePermission
}