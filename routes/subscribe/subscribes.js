const express = require('express');
const { authenticateMiddleware } = require('../../middleware/auth.middleware');
const subscribeController = require('./subscribes.controller');

const router = express.Router();

router.post('/:id', authenticateMiddleware, subscribeController.subscribe);
router.post('/remove/:id', authenticateMiddleware, subscribeController.unsubscribe);

module.exports = router;
