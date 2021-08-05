const express = require('express');
const categoryController = require('../controllers').category;
const userController = require('../controllers').user;

const router = express.Router();

router.post('/', userController.authenticateMiddleware, categoryController.postCategory);

module.exports = router;
