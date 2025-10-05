const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const upload = require('../config/cloudiary');
const { authenticateToken, asyncHandler, isAdmin } = require('../middleware/auth.middleware');
router.use(authenticateToken);
router.post('/users/store', upload.single('avatar'), asyncHandler(userController.store));
router.get('/users/profile/:id', asyncHandler(userController.getProfile));
router.put('/avatar', upload.single('avatar'), asyncHandler(userController.uploadAvatar));
router.get('/users/list', isAdmin, asyncHandler(userController.listUsers));
router.put('/users/edit/:id', asyncHandler(userController.editProfile))
router.put('/users/status/:id', isAdmin, asyncHandler(userController.updateStatusByField));
router.delete('/users/destroy/:id', isAdmin, asyncHandler(userController.trash));
module.exports = router 