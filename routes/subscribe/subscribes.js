const express = require('express');
const subscribeController = require('../../controllers').subscribes;
const userController = require('../../controllers').user;

const router = express.Router();

router.get('/', subscribeController.findSubscribers);
router.post('/', userController.authenticateMiddleware, subscribeController.createSubscribe);
router.post('/remove', userController.authenticateMiddleware, subscribeController.unsubscribe);

module.exports = router;
