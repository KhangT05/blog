const pool = require('../../config/database');
class BaseServices {
    constructor(model, column) {
        this.model = model;
        this.column = column;
    };
    async pagination(filter, options = {}) {
        let sql = `SELECT ${this.column} FROM ${this.model}`;
        const params = [];
        if (Object.keys(filter).length > 0) {
            const whereClause = Object.keys(filter).map(key => `${key} = ?`).join(' AND ');
            sql += `WHERE ${whereClause}`;
            params.push(...Object.keys(filter))
        };
        if (options.orderBy) {
            sql += `ORDER BY ${options.orderBy} ${options.orderBy || 'ASC'}`
        }
        if (options.limit) {
            sql += `LIMIT ?`;
            params.push(options.limit)
        }
        if (options.offset) {
            sql += `OFFSET ?`;
            params.push(options.offset)
        }
        return await pool.query(sql, params)
    }
}
module.exports = new BaseServices();