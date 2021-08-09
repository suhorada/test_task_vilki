const express = require('express');
const { authenticateMiddleware } = require('../../services/auth.middleware');
const categoryController = require('./category.controller');

const router = express.Router();

router.post('/', authenticateMiddleware, categoryController.postCategory);

module.exports = router;
