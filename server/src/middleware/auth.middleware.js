const jwt = require('jsonwebtoken')
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Thiếu hoặc sai định dạng header xác thực.' });
    }
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token không tồn tại' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
        }
        req.user = decoded;
        next();
    });
}
const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
}
module.exports = {
    authenticateToken,
    asyncHandler,
    errorHandler
}