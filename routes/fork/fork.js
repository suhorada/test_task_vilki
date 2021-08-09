const express = require('express');
const { authenticateMiddleware } = require('../../middleware/auth.middleware');
const forkController = require('./fork.controller');

const router = express.Router();

router.get('/', authenticateMiddleware, forkController.list);
router.post('/', authenticateMiddleware, forkController.postFork);

module.exports = router;
