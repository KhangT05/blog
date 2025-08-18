const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const upload = require('../config/cloudiary');
const { authenticateToken } = require('../middleware/auth.middleware');
router.post('/user/store', authenticateToken, upload.single('avatar'), userController.store);
router.get('/user/profile/:id', authenticateToken, userController.getProfile);
router.put('/avatar', authenticateToken, upload.single('avatar'), userController.uploadAvatar);
router.get('/user',authenticateToken, userController.getAllUsers);
router.put('/user/edit/:id',authenticateToken,userController.editProfile)
router.put('/user/delete/:id', authenticateToken, userController.deletedU);
router.delete('/user/delete/:id', authenticateToken, userController.trash);
module.exports = router 