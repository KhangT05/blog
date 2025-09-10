const pool = require('../config/database');
const bcrypt = require('bcrypt');
const {
    BadRequestError,
    ConFlictRequestError,
    UnauthorizedRequestError,
    NotFoundRequestError
} = require('../middleware/error.respone')
const store = async (name, email, password, phone, gender, avatar, role = []) => {
    if (!role || role.length === 0 || !Array.isArray(role)) {
        throw new BadRequestError("Role phải là một mảng và không được rỗng.");
    }
    const [checkRole] = await pool.promise().query('SELECT id FROM roles WHERE id IN (?)', [role]);
    if (checkRole.length !== role.length) {
        throw new BadRequestError("Một hoặc nhiều roles không tồn tại hoặc không hợp lệ.");
    }
    const [rows] = await pool.promise().query('SELECT email,phone FROM users WHERE email = ? OR phone = ?'
        , [email, phone]);

    if (rows.length > 0) {
        const existingUser = rows[0];
        if (existingUser.email === email) {
            throw new ConFlictRequestError('Email đã tồn tại.');
        } else {
            throw new ConFlictRequestError('Số điện thoại đã tồn tại.');
        }
    }
    const hash = await bcrypt.hash(password, 10);
    const conn = 'INSERT INTO users SET ?';
    const userData = { name, email, password: hash, phone, gender, avatar };
    const [result] = await pool.promise().query(conn, userData);
    const userId = result.insertId;
    const userRoles = checkRole.map(roleObj => [userId, roleObj.id]);
    await pool.promise().query('INSERT INTO users_has_roles(user_id, role_id) VALUES ?', [userRoles])
}
const edit = async (id, name, email, phone, gender, role = []) => {
    const [userRows] = await pool.promise().query(
        'SELECT id FROM users WHERE id = ?', [id]
    );
    if (!userRows) {
        throw new NotFoundRequestError('Người dùng không tồn tại.')
    }
    if (role.length > 0 && Array.isArray(role)) {
        const [checkRole] = await pool.promise().query('SELECT id FROM roles WHERE id IN (?)', [role]);
        if (checkRole.length !== role.length) {
            throw new BadRequestError("Một hoặc nhiều roles không tồn tại hoặc không hợp lệ.");
        }
        await pool.promise().query(
            'DELETE FROM users_has_roles WHERE id = ?', [id]
        );
        const newRoles = checkRole.map(p => [id, p.id]);
        await pool.promise().query('INSERT INTO users_has_roles( user_id,role_id ) VALUES ?', [newRoles])
    };
    const conn = 'UPDATE users SET ? WHERE id = ?';
    const values = { name, email, phone, gender, updated_at: new Date() };
    await pool.promise().query(conn, [values, id]);
    return { id, name, email, phone, gender };

}
const uploadAvatar = async (id, avatar) => {
    const conn = 'UPDATE users SET avatar = ? WHERE id = ?';
    await pool.promise().query(conn, [avatar, id])
}
const getProfile = async (id) => {
    const [rows] = await pool.promise().query(
        'SELECT avatar,name,email,phone,gender,status FROM users WHERE id = ?', [id]
    );
    if (rows.length === 0) {
        throw new NotFoundRequestError('Người dùng không tồn tại.')
    }
    return rows[0]
}
// const trashAvatar = async (id) => {
//     const [rows] = await pool.promise().query('SELECT avatar FROM users WHERE id = ?', [id]);
//     const avatarUrl = rows[0]?.avatar;
//     if (!avatarUrl) {
//         throw new Error('Người dùng chưa có ảnh đại diện.');
//     }
//     const public_id = 
// }
// const extractPublic = async () => {
//     const parts = urlencoded.
// }
const listUsers = async (page = 1, limit = 10, keyword = '', filter = '') => {
    const offset = (page - 1) * limit;
    let whereConditions = [];
    let queryParams = [];
    let countParams = [];
    if (keyword) {
        const searchTerms = `%${keyword.trim()}%`;
        whereConditions.push('(name LIKE ? OR phone LIKE ?)');
        queryParams.push(searchTerms, searchTerms);
        countParams.push(searchTerms, searchTerms);
    }
    if (filter.gender && typeof filter === 'string') {
        whereConditions.push(`gender = ?`);
        queryParams.push(filter.gender);
        countParams.push(filter.gender)
    }
    let whereClause = '';
    if (whereConditions.length > 0) {
        whereClause = `WHERE ${whereConditions.join(' AND ')}`
    }
    const selectParams = [...queryParams, limit, offset]
    const selectQuery = `
        SELECT id,avatar,name,email,phone,gender,status FROM users ${whereClause} LIMIT ? OFFSET ?
    `
    const countQuery = `SELECT COUNT(id) as count FROM users ${whereClause}`;
    const [rows] = await pool.promise().query(selectQuery, selectParams);
    const [[{ count }]] = await pool.promise().query(countQuery, countParams)
    const lastPage = Math.ceil(count / limit);
    const nextPage = page < lastPage ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null
    return {
        data: rows,
        total: count,
        currentPage: page,
        lastPage,
        nextPage,
        prevPage,
    }
}
const deleted = async (id) => {
    const conn = 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP, status = 0 WHERE id = ?';
    await pool.promise().query(conn, [id]);
    return { id }
}
const trash = async (id) => {
    const conn = 'DELETE FROM users WHERE id = ?'
    await pool.promise().query(conn, [id]);
    return { id };
}
module.exports = {
    store,
    edit,
    uploadAvatar,
    getProfile,
    listUsers,
    deleted,
    trash,
}