const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUser = async ({ email }) => {
    const query = 'SELECT id,name,email,password FROM users WHERE email = ?';
    const [rows] = await pool.promise().query(query, [email])
    return rows.length > 0 ? rows[0] : null
}
const register = async ({ name, email, password }) => {
    const existingUser = await validateUser({ email });
    if (existingUser) {
        const error = new Error('Email đã tồn tại');
        error.status = 400;
        throw error;
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
        const error = new Error('Email hoặc mật khẩu không đúng');
        error.status = 401;
        throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Email hoặc mật khẩu không đúng');
        error.status = 401;
        throw error;
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
        expiresIn: '10m'
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
    const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN);
    return {
        success: true,
        userId: decoded.sub,
        email:decoded.email
    }
}
const clearCookies = (res) => {
    res.clearCookie('refreshToken', { path: '/' })
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