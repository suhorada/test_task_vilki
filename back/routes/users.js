const express = require('express');
const userController = require('../controllers').user;

const router = express.Router();

router.get('/', userController.list);
router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.post('/token', userController.updateToken);

module.exports = router;
