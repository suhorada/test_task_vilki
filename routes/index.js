const express = require('express');

const router = express.Router();
const usersRouter = require('./user/users');
const forkRouter = require('./fork/fork');
const categoryRouter = require('./category/category');
const subscribeRouter = require('./subscribe/subscribes');

router.use('/user', usersRouter);
router.use('/fork', forkRouter);
router.use('/category', categoryRouter);
router.use('/subscribes', subscribeRouter);

module.exports = router;
