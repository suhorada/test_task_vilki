const express = require('express');
const vilkaController = require('../controllers').vilka;

const router = express.Router();

/* GET users listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
// });
router.get('/', vilkaController.list);
router.post('/', vilkaController.postVilka);
// router.post('/login', userController.login);
// router.post('/token', userController.updateToken);

module.exports = router;
