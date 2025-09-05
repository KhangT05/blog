const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    BadRequestError,
    ConFlictRequestError,
    UnauthorizedRequestError,
    NotFoundRequestError
} = require('../middleware/error.respone')
const validateUser = async ({ email }) => {
    const query = 'SELECT id,name,email,password FROM users WHERE email = ?';
    const [rows] = await pool.promise().query(query, [email])
    return rows.length > 0 ? rows[0] : null
}
const register = async ({ name, email, password }) => {
    const existingUser = await validateUser({ email });
    if (existingUser) {
        throw new ConFlictRequestError('Email đã tồn tại');
    }
    const hash = await bcrypt.hash(password, 10);
    const conn = 'INSERT INTO users SET ?';
    const userData = { name, email, password: hash };
    await pool.promise().query(conn, userData);
    return {
        message: 'Đăng ký thành công.',
    };
}
const login = async ({ email, password }) => {
    const user = await validateUser({ email });
    if (!user) {
        throw new NotFoundRequestError('Email này không tồn tại');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new UnauthorizedRequestError('Mật khẩu không đúng');
    }
    return {
        success: true,
        message: 'Đăng nhập thành công',
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}
const generateAccessToken = async (user) => {
    const payload = {
        sub: user.id,
        email: user.email
    }
    const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: '15m'
    });
    return {
        accessToken,
    }
}
const generateRefreshToken = async (user) => {
    const payload = {
        sub: user.id,
        email: user.email
    }
    const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: '30d'
    });
    return {
        refreshToken,
    }
}
const setAuthCookies = (res, tokens) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    }
    res.cookie('refreshToken', tokens.refreshToken, {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
}
const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
        return {
            success: true,
            userId: decoded.sub,
            email: decoded.email
        };
    } catch (error) {
        throw new UnauthorizedRequestError('Refresh token không hợp lệ hoặc đã hết hạn.');
    }
}
const clearCookies = (res) => {
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
}
module.exports = {
    validateUser,
    register,
    login,
    setAuthCookies,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    clearCookies
}