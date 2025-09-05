const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const settingControllers = require('../controllers/settings.controllers');
router.use(authenticateToken);
router.post('/setting/store', settingControllers.store);
router.get('/setting/list', settingControllers.listSetting)
module.exports = router;