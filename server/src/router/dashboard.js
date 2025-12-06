const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');
const { authenticateToken, asyncHandler, isAdmin } = require('../middleware/auth.middleware');
router.use(authenticateToken, isAdmin);
router.get('/admin/dashboard', asyncHandler(DashboardController.getProfile));
module.exports = router 