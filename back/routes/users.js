const express = require('express');
const userController = require('../controllers').user;

const router = express.Router();

/* GET users listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
// });
router.get('/', userController.list);
router.post('/signup', userController.createUser);
router.post('/login', userController.login);

module.exports = router;
