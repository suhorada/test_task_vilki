const express = require('express');
const vilkaController = require('../controllers').vilka;
const userController = require('../controllers').user;

const router = express.Router();

router.get('/', userController.authenticateMiddleware, vilkaController.list);
router.post('/', userController.authenticateMiddleware, vilkaController.postVilka);

module.exports = router;
