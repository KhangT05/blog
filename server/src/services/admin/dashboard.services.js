const pool = require('../../config/database');
class DashboardServices {
    static async countUser() {
        const queryString = await pool.promise().query(
            'Select count(id) from users'
        )
        console.log(queryString)
    }
}
module.exports = new DashboardServices();