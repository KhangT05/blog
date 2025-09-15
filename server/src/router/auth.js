const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const { authenticateToken, asyncHandler } = require('../middleware/auth.middleware');
router.post('/auth/register', asyncHandler(authController.register));
router.post('/auth/login', asyncHandler(authController.login));
router.post('/auth/refresh', asyncHandler(authController.refreshToken));
router.use(authenticateToken);
router.get('/auth/me', asyncHandler(authController.authMe));
router.post('/auth/logout', asyncHandler(authController.logout));
module.exports = router