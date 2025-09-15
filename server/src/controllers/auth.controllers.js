const authService = require('../services/auth.services');
const { OK, CREATED } = require('../middleware/success.response')
const register = async (req, res) => {
    const result = await authService.register(req.body)
    return CREATED(
        res,
        'Tạo tài khoản thành công.',
        result
    )
};

const login = async (req, res) => {
    const { user } = await authService.login(req.body);
    const accessToken = await authService.generateAccessToken(user);
    const refreshToken = await authService.generateRefreshToken(user);
    const tokens = authService.setAuthCookies(res, {
        accessToken,
        refreshToken
    });
    return OK(
        res,
        'Login successful',
        {
            user,
            accessToken: tokens.accessToken,
        },
    )
};
const authMe = async (req, res) => {
    const user = await authService.validateUser({ email: req.user.email });
    return OK(
        res,
        "User profile retrieved successfully",
        {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        }
    )
}
const refreshToken = async (req, res) => {
    const result = await authService.refreshToken(req, res);
    return OK(
        res,
        result.message,
        {
            accessToken: result.accessToken,
            user: result.user
        }
    )
}
const logout = async (req, res) => {
    const refreshTokenValue = req.cookies?.refreshToken;
    if (refreshTokenValue) {
        await authService.verifyToken(refreshTokenValue, true);
    }
    await authService.clearCookies(res);
    return OK(
        res,
        "Đăng xuất thành công",
        null
    );
}
module.exports = {
    register,
    login,
    authMe,
    refreshToken,
    logout
};