const auth = require('./auth');
const error = require('../middleware/error');
const initRouter = (app) => {
    app.use('/api/v1',auth);
    app.use(error.notFound);
    app.use(error.errorHandler);
}
module.exports = initRouter