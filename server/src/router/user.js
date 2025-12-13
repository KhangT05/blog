const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controllers');
const upload = require('../config/cloudiary');
const { authenticateToken, asyncHandler, isAdmin } = require('../middleware/auth.middleware');
router.use(authenticateToken, isAdmin);
// router.post('/users/store', upload.single('avatar'), asyncHandler(UserController.store));
// router.get('/users/profile/:id', asyncHandler(UserController.getProfile));
// router.put('/avatar', upload.single('avatar'), asyncHandler(UserController.uploadAvatar));
// router.get('/users/list', isAdmin, asyncHandler(UserController.listUsers));
// router.put('/users/edit/:id', asyncHandler(UserController.editProfile))
// router.put('/users/status/:id', isAdmin, asyncHandler(UserController.updateStatusByField));
// router.delete('/users/destroy/:id', isAdmin, asyncHandler(UserController.trash));
router.get('/users/list', asyncHandler(UserController.index));
module.exports = router