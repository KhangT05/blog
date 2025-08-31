const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const { authenticateToken } = require('../middleware/auth.middleware');
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.refreshToken);
router.use(authenticateToken);
router.get('/auth/me', authController.authMe);
router.delete('/auth/logout', authController.logout);
module.exports = router