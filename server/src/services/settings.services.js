const pool = require('../config/database');
const {
    NotFoundRequestError,
    ConFlictRequestError
} = require('../middleware/error.respone');
class settingServices {
    static async store(site_name, site_brand, site_email, site_phone, site_address, site_social) {
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
        const siteData = 'INSERT INTO settings SET ?'
        const [result] = await pool.promise().query(siteData, [
            site_name, site_brand, site_email, site_phone, site_address, site_social
        ])
        return {
            message: 'Settings saved successfully',
        }
    }
    static async listSetting() {
        const [rows] = await pool.promise().query(
            'SELECT site_name, site_brand, site_email, site_phone, site_address, site_social FROM settings'
        );
        if (rows.length === 0) {
            throw new NotFoundRequestError('Kết quả không tìm thấy!')
        }
        return {
            rows
        }
    }
    static edit = async (site_name, site_email, site_phone, site_address, site_social) => {
    }
}
module.exports = settingServices;