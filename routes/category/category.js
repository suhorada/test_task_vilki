const express = require('express');
// const categoryController = require('../../controllers').category;
const categoryController = require('./category.controller');
const userController = require('../../controllers').user;

const router = express.Router();

router.post('/', userController.authenticateMiddleware, categoryController.postCategory);

module.exports = router;
