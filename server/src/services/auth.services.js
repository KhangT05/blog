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
    const query = 'SELECT id,name,email,password,role FROM users WHERE email = ?';
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
            email: user.email,
            role: user.role
        }
    };
}
const generateAccessToken = async (user) => {
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    }
    const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });
    return accessToken;
}
const generateRefreshToken = async (user) => {
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    }
    const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    });
    return refreshToken;
}
const setAuthCookies = (res, tokens) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    };
    res.cookie('accessToken', tokens.accessToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000,
    })
    res.cookie('refreshToken', tokens.refreshToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000,
    });
    return tokens
}
const verifyToken = async (token, isRefreshToken = false) => {
    try {
        const secret = isRefreshToken ?
            process.env.REFRESH_TOKEN_SECRET :
            process.env.ACCESS_TOKEN_SECRET
        const decoded = jwt.verify(token, secret);
        return {
            success: true,
            userId: decoded.sub,
            email: decoded.email,
            role: decoded.role
        };
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new UnauthorizedRequestError("Token đã hết hạn")
        } else if (error.name === "JsonWebTokenError") {
            throw new UnauthorizedRequestError("Token không hợp lệ")
        } else {
            throw new BadRequestError("Lỗi xác thực token")
        }
    }
}
const refreshToken = async (req, res) => {
    const refreshToken = req?.cookies.refreshToken;
    if (!refreshToken) {
        throw new UnauthorizedRequestError("Refresh token không được cung cấp")
    }
    const decoded = await verifyToken(refreshToken, true)
    const user = await validateUser({ email: decoded.email })
    if (!user) {
        throw new NotFoundRequestError("Người dùng không tồn tại")
    }
    const newAccessToken = await generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(user);
    setAuthCookies(res, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    });
    return {
        success: true,
        message: 'Token được làm mới thành công',
        accessToken: newAccessToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
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
    clearCookies,
    refreshToken,
}