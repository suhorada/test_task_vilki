const express = require('express');
const subscribeController = require('../controllers').subscribes;
const userController = require('../controllers').user;

const router = express.Router();

router.post('/', userController.authenticateMiddleware, subscribeController.createSubscribe);
router.post('/remove', userController.authenticateMiddleware, subscribeController.unsubscribe);
router.get('/', subscribeController.findSubscribers);

module.exports = router;
