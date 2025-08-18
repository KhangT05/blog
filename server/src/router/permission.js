const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissions.controllers');
const { authenticateToken } = require('../middleware/auth.middleware');
router.post('/permission/store',authenticateToken,permissionController.store)
module.exports = router