const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const forkRouter = require('./fork');
const categoryRouter = require('./category');
const subscribeRouter = require('./subscribes');

router.use('/user', usersRouter);
router.use('/fork', forkRouter);
router.use('/category', categoryRouter);
router.use('/subscribes', subscribeRouter);

module.exports = router;
