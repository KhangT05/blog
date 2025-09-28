const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categories.controllers');
const { authenticateToken, asyncHandler, isAdmin } = require('../middleware/auth.middleware');
router.use(authenticateToken, isAdmin)
router.post('/category/store', asyncHandler(categoryControllers.store));
router.get('/category/list', asyncHandler(categoryControllers.listCategories))
module.exports = router;