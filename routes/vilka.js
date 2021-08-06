const express = require('express');
const forkController = require('../controllers').fork;
const userController = require('../controllers').user;

const router = express.Router();

router.get('/', userController.authenticateMiddleware, forkController.list);
router.post('/', userController.authenticateMiddleware, forkController.postFork);

module.exports = router;
