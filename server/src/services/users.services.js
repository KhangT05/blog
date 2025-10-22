const pool = require('../config/database');
const bcrypt = require('bcrypt');
const {
    BadRequestError,
    ConFlictRequestError,
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
function paginateAgrument(request) {
    return {
        keyword: {
            search: request.keyword || '',
            fields: ['name', 'email', 'created_at', 'updated_at']
        },
        // sort: request?.sort ? request.sort.split(',') : ['id', 'asc'],
        perpage: parseInt(request.perpage) || 10,
        page: parseInt(request.page) || 1,
        filters: {
            status: request.status !== undefined ? parseInt(request.status) : null
        }
    }
}
const listUsers = async (request) => {
    const args = paginateAgrument(request);
    const { keyword, perpage, page, filters } = args;

    const offset = (page - 1) * perpage;

    const condition = [];
    const queryParams = [];
    const countParams = [];

    if (keyword.search) {
        const searchPattern = `%${keyword.search}%`;
        const searchConditions = keyword.fields
            .map((field) =>
                `${field} LIKE ?`)
            .join(' OR ');
        condition.push(`(${searchConditions})`);
        keyword.fields.forEach(() => {
            queryParams.push(searchPattern);
            countParams.push(searchPattern);
        });
    }
    if (filters.status) {
        condition.push('status = ?');
        queryParams.push(filters.status);
        countParams.push(filters.status);
    }
    const whereClause = condition.length > 0 ? `WHERE ${condition.join(' AND ')}` : ''
    let queryString = `SELECT id,name,email,status,created_at,updated_at
     FROM users ${whereClause} LIMIT ? OFFSET ?`;
    queryParams.push(perpage, offset)
    const countQuery = `SELECT COUNT(id) as count FROM users ${whereClause}`;
    const [rows] = await pool.promise().query(queryString, queryParams);
    const [[{ count }]] = await pool.promise().query(countQuery, countParams);


    const totalPages = Math.ceil(count / perpage);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
    return {
        users: rows,
        pagination: {
            totalPages,
            currentPage: page,
            nextPage,
            prevPage
        }
    }
}
const updateStatusByField = async (status, id) => {
    const conn = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP, status = ? WHERE id = ?';
    const [rows] = await pool.promise().query(conn, [status, id]);
    return {
        result: rows
    }
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
    updateStatusByField,
    trash,
}