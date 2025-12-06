const DashboardServices = require('../services/admin/dashboard.services');
const { CREATED, OK } = require('../middleware/success.response');
const { } = require('../middleware/error.respone');
class DashboardController {
    static async countUsers() {
        try {
            return OK(
                res,
                '',
                // await 
            )
        } catch (error) {

        }
    }
}
module.exports = new DashboardController();