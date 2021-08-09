const express = require('express');
const { authenticateMiddleware } = require('../../services/auth.middleware');
const subscribeController = require('./subscribes.controller');

const router = express.Router();

router.post('/', authenticateMiddleware, subscribeController.subscribe);
router.post('/remove', authenticateMiddleware, subscribeController.unsubscribe);

module.exports = router;
