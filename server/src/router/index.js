const auth = require('./auth');
const user = require('./user');
const permission = require('./permission');
const role = require('./role');
const category = require('./category');
const initRouter = (app) => {
    app.use('/api/v1', [
        auth,
        user,
        permission,
        role,
        category
    ]);
}
module.exports = initRouter