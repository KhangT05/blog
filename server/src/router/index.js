const auth = require('./auth');
const user = require('./user');
const category = require('./category');
const setting = require('./settings');
const dashboard = require('./dashboard');
const initRouter = (app) => {
    app.use('/api/v1', [
        auth,
        user,
        setting,
        category,
        dashboard
    ]);
}
module.exports = initRouter