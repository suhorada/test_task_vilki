const express = require('express');
const userController = require('./users.controller');

const router = express.Router();

router.post('/signup', userController.postUser);
router.post('/login', userController.signIn);

module.exports = router;
