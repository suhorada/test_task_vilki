const express = require('express');
const vilkaController = require('../controllers').vilka;
const userController = require('../controllers').user;

const router = express.Router();

/* GET users listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
// });
router.get('/', userController.authenticateMiddleware, vilkaController.list);
// router.get('/?category', userController.authenticateMiddleware, vilkaController.listByCategory);
router.post('/', userController.authenticateMiddleware, vilkaController.postVilka);
// router.post('/token', userController.updateToken);

module.exports = router;
