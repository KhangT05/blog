const authService = require('../services/auth.services');

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        const accessToken = await authService.generateAccessToken(result.user);
        const token = await authService.generateRefreshToken(result.user);
        await authService.setAuthCookies(res, token);
        return res.status(200).json({
            data: result,
            token: accessToken
        });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
};
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    const decoded = await authService.verifyToken(refreshToken);
    const user = await authService.validateUser({ email: decoded.email })
    if(!user){
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    const newAccessToken = await authService.generateAccessToken(user);
    const newRefreshToken = await authService.generateRefreshToken(user);
    await authService.setAuthCookies(res,newRefreshToken);
    return res.status(200).json({
            message: 'Token được làm mới thành công',
            accessToken: newAccessToken.accessToken
    });
}
const logout = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    await authService.verifyToken(refreshToken);
    await authService.clearCookies(res);
    return res.status(200).json({ message: 'Đăng xuất thành công' });
}
module.exports = {
    register,
    login,
    refreshToken,
    logout
};