const pool = require('../config/database');
const {
    NotFoundRequestError,
    ConFlictRequestError
} = require('../middleware/error.respone');
class settingServices {
    static store = async (payload) => {
        const {
            site_name,
            site_brand,
            site_email,
            site_phone,
            site_address,
            site_social
        } = payload;
        const [checkRows] = await pool.promise().query(
            'SELECT site_email,site_phone FROM settings WHERE site_email = ? OR site_phone = ?',
            [site_email, site_phone]
        );
        if (checkRows.length > 0) {
            if (checkRows[0].site_email === site_email) {
                throw new ConFlictRequestError('Email already exists')
            }
            else {
                throw new ConFlictRequestError('Phone number already exists')
            }
        }
        const siteData = {
            site_name,
            site_brand,
            site_email,
            site_phone,
            site_address,
            site_social
        }
        const [result] = await pool.promise().query('INSERT INTO settings SET ?', [siteData])
        return {
            system: result,
            message: 'Settings saved successfully',
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
module.exports = settingServices;