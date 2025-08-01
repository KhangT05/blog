const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const authenticateToken = require('../middleware/auth.middleware');
router.post('/auth/register',authController.register);
router.post('/auth/login',authController.login);
router.post('/auth/refresh',authController.refreshToken)
router.delete('/auth/logout',authenticateToken,authController.logout)
module.exports = router