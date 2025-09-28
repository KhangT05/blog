const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const upload = require('../config/cloudiary');
const { authenticateToken, asyncHandler, isAdmin } = require('../middleware/auth.middleware');
router.use(authenticateToken);
router.post('/users/store', upload.single('avatar'), asyncHandler(userController.store));
router.get('/users/profile/:id', asyncHandler(userController.getProfile));
router.put('/avatar', upload.single('avatar'), asyncHandler(userController.uploadAvatar));
router.get('/users/list', asyncHandler(userController.listUsers));
router.put('/users/edit/:id', asyncHandler(userController.editProfile))
router.put('/users/updateStatus/:id', asyncHandler(userController.deletedU));
router.delete('/users/destroy/:id', asyncHandler(userController.trash));
module.exports = router 