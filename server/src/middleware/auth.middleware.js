const jwt = require('jsonwebtoken');
const {
    UnauthorizedRequestError,
    ConFlictRequestError
} = require('../middleware/error.respone');
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedRequestError("Access token required");
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new ConFlictRequestError("Invalid or expired token");
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        next(error);
    }
}
const isAdmin = async (req, res, next) => {
    const { role } = req.user;
    if (role !== 'SUPER ADMIN') {
        throw new ConFlictRequestError("Bạn không có quyền truy cập tài nguyên này.")
    }
    next();
}
const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}
const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
}
module.exports = {
    authenticateToken,
    isAdmin,
    asyncHandler,
    errorHandler
}