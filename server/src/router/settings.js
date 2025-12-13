const express = require('express');
const router = express.Router();
const { authenticateToken, asyncHandler, isAdmin } = require('../middleware/auth.middleware');
const SettingsController = require('../controllers/settings.controllers');
router.use(authenticateToken, isAdmin);
router.post('/settings/store', asyncHandler(SettingsController.store));
// router.get('/setting/list', asyncHandler(settingControllers.pagination))
module.exports = router;