const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const upload = require('../config/cloudiary');
const { authenticateToken } = require('../middleware/auth.middleware');
router.use(authenticateToken);
router.post('/user/store', upload.single('avatar'), userController.store);
router.get('/user/profile/:id', userController.getProfile);
router.put('/avatar', upload.single('avatar'), userController.uploadAvatar);
router.get('/user', userController.listUsers);
router.put('/user/edit/:id',userController.editProfile)
router.put('/user/delete/:id',userController.deletedU);
router.delete('/user/delete/:id',userController.trash);
module.exports = router 