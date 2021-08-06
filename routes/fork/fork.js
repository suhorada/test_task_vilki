const express = require('express');
const forkController = require('./fork.controller');
const userController = require('../../controllers').user;

const router = express.Router();

router.get('/', userController.authenticateMiddleware, forkController.list);
router.post('/', userController.authenticateMiddleware, forkController.postFork);

module.exports = router;
