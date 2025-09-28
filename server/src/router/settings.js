const express = require('express');
const router = express.Router();
const { authenticateToken, asyncHandler } = require('../middleware/auth.middleware');
const settingControllers = require('../controllers/settings.controllers');
router.use(authenticateToken);
router.post('/setting/store', asyncHandler(settingControllers.store));
router.get('/setting/list', asyncHandler(settingControllers.pagination))
module.exports = router;