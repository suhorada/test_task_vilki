const express = require('express');
const userController = require('./users.controller');

const router = express.Router();

// router.get('/', userController.list);
router.post('/signup', userController.postUser);
router.post('/login', userController.signIn);
router.post('/token', userController.updateToken);

module.exports = router;
