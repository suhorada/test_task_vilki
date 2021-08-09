const express = require('express');
const refreshController = require('./refresh.controller');

const router = express.Router();

router.post('/', refreshController.refreshTokens);

module.exports = router;
