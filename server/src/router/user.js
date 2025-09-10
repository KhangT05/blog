const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const upload = require('../config/cloudiary');
const { authenticateToken } = require('../middleware/auth.middleware');
router.use(authenticateToken);
router.post('/users/store', upload.single('avatar'), userController.store);
router.get('/users/profile/:id', userController.getProfile);
router.put('/avatar', upload.single('avatar'), userController.uploadAvatar);
router.get('/users/list', userController.listUsers);
router.put('/users/edit/:id', userController.editProfile)
router.put('/users/delete/:id', userController.deletedU);
router.delete('/users/delete/:id', userController.trash);
module.exports = router 