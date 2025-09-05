const auth = require('./auth');
const user = require('./user');
const category = require('./category');
const setting = require('./settings')
const initRouter = (app) => {
    app.use('/api/v1', [
        auth,
        user,
        category,
        setting
    ]);
}
module.exports = initRouter