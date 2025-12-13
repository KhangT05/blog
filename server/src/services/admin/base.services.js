const pool = require('../../config/database');
class BaseService {
    constructor(model, options = {}) {
        this.model = model;
        this.columns = options.columns || ['*'];
        this.fillable = options.fillable || null;
        this.hidden = options.hidden || [];
    };
    buildColoumns(customColumns) {
        if (customColumns) {
            return Array.isArray(customColumns) ? customColumns.join(', ') : customColumns;
        }
        return this.columns.join(', ');
    }
    filterFillable(data) {
        if (!this.fillable) return data;
        const filtered = {};
        this.fillable.forEach(key => {
            if (data.hasOwnProperty(key)) {
                filtered[key] = data[key];
            }
        });
        return filtered;
    }
    async pagination(filter, options = {}) {
        const columns = this.buildColoumns(options.select);
        let sql = `SELECT ${columns} FROM ${this.model}`;
        const params = [];
        if (Object.keys(filter).length > 0) {
            const whereClause = Object.keys(filter).map(key => `${key} = ?`).join(' AND ');
            sql += ` WHERE ${whereClause}`;
            params.push(...Object.values(filter))
        };
        if (options.orderBy) {
            sql += ` ORDER BY ${options.orderBy} ${options.order || 'ASC'}`
        }
        if (options.limit) {
            sql += `LIMIT ?`;
            params.push(options.limit)
        }
        if (options.offset) {
            sql += `OFFSET ?`;
            params.push(options.offset)
        }
        const [rows] = await pool.promise().query(sql, params);
        return rows;
    }
    async findAll(filter, options) {
        return await this.pagination(filter, options);
    }
    async findById(id, options) {
        const columns = this.buildColoumns(options.select);
        const sql = `SELECT ${columns} FROM ${this.model} WHERE id = ? LIMIT 1`;
        const [rows] = await pool.promise().query(sql, [id]);
        return rows[0] || null;
    }
    async findOne(filter, options = {}) {
        const columns = this.buildColoumns(options.select);
        const whereClause = Object.keys(filter)
            .map(key => `${key} = ?`)
            .join(' AND ');
        const sql = `SELECT ${columns} FROM ${this.model} WHERE ${whereClause} LIMIT 1`;
        const [rows] = await pool.promise().query(sql, Object.values(filter));
        return rows[0] || null;
    }
    async store(payload) {
        const filterData = this.filterFillable(payload);
        const columns = Object.keys(filterData).join(', ');
        const placeholders = Object.keys(filterData).map(() => '?').join(',');
        console.log()
        let sql = `INSERT INTO ${this.model} (${columns}) VALUES (${placeholders})`;
        return await pool.promise().query(sql, Object.values(filterData));
    }
}
module.exports = BaseService;