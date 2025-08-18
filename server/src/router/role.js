const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roles.controllers');
const { authenticateToken } = require('../middleware/auth.middleware');
router.post('/role/store', authenticateToken, roleController.store);
router.get('/role/getMany', roleController.getMany);
router.delete('/role/trash/:id',authenticateToken, roleController.trash);
router.put('/updatePermission',roleController.updatePermission)
module.exports = router;
