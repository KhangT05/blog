const pool = require('../../config/database');
const {
    NotFoundRequestError,
    ConFlictRequestError
} = require('../../middleware/error.respone');
const BaseService = require('./base.services');
class settingServices extends BaseService {
    constructor() {
        super('settings', {
            columns: ['id', 'site_name', 'site_email', 'site_phone', 'site_address'
                , 'site_brand', 'site_social', 'status', 'created_at', 'updated_at'],
            fillable: ['site_name', 'site_email', 'site_phone', 'site_address', 'site_social'],
        });
    }
    async store(payload) {
        const {
            site_name,
            site_email,
            site_phone,
            site_address,
            site_social
        } = payload;
        const existingEmail = await this.findOne({ site_email });
        if (existingEmail) {
            throw new ConFlictRequestError('Email đã tồn tại trong hệ thống');
        }
        const existingPhone = await this.findOne({ site_phone });
        if (existingPhone) {
            throw new ConFlictRequestError('Số điện thoại đã tồn tại trong hệ thống');
        }
        const settingData = { site_name, site_email, site_address, site_phone, site_social };
        const result = await super.store(settingData);
        console.log(result)
        return {
            settings: result
        }
    }
    static async pagination() {
        const [rows] = await pool.promise().query(
            `SELECT site_name, site_brand, site_email, site_phone, site_address, site_social 
            FROM settings`
        );
        if (rows.length === 0) {
            throw new NotFoundRequestError('Kết quả không tìm thấy!')
        }
        return {
            settings: rows
        }
    }
    static edit = async (payload) => {
        const {
            id, site_name, site_brand, site_email, site_phone, site_address, site_social
        } = payload;
        const [checkRows] = await pool.promise().query(
            'SELECT site_email,site_phone FROM settings WHERE site_email = ? OR site_phone = ?',
            [site_email, site_phone]
        );
        if (checkRows.length > 0) {
            if (checkRows[0].site_email) {
                throw new ConFlictRequestError('Email already exists')
            }
            else {
                throw new ConFlictRequestError('Phone number already exists')
            }
        }
        const siteData = 'UPDATE settings SET ? WHERE id = ?'
        const [result] = await pool.promise().query(siteData, [
            site_name, site_brand, site_email, site_phone, site_address, site_social, id
        ]);
        return {
            system: result,
            message: 'Settings saved successfully',
        }
    }
}
module.exports = new settingServices();