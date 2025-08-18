const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categories.controllers');
const { authenticateToken,asyncHandler } = require('../middleware/auth.middleware');
router.use(authenticateToken)
router.post('/category/store', asyncHandler(categoryControllers.store));
router.get('/category/list',asyncHandler(categoryControllers.listCategories))
module.exports = router;