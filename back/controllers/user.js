const { User } = require('../models');

const list = (req, res) => User
  .findAll()
  .then((resp) => res.status(200).send(resp))
  .catch((error) => { res.status(400).send(error); });

module.exports = {
  list,
};
