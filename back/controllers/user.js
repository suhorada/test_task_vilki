const jwt = require('jsonwebtoken');
const { User } = require('../models');

const list = (req, res) => User
  .findAll()
  .then((resp) => res.status(200).send(resp))
  .catch((error) => { res.status(400).send(error); });

const createUser = async (req, res) => {
  let alreadyCreated = false;
  let alreadyCreatedEmail = false;
  let response;
  let responseEmail;
  try {
    response = await User.findOne({ where: { login: req.body.login } });
    responseEmail = await User.findOne({ where: { email: req.body.email } });
  } catch (err) {
    res.status(404).send(err);
  }
  alreadyCreated = (response !== null);
  alreadyCreatedEmail = (responseEmail !== null);
  if (!req.body.login || !req.body.password) {
    res.status(400).send({ msg: 'Please pass login and password.' });
  } else if (!alreadyCreated && !alreadyCreatedEmail) {
    try {
      const user = await User
        .create({
          login: req.body.login,
          email: req.body.email,
          password: req.body.password,
        });
      res.status(201).send(
        jwt.sign(JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
          process.env.secret, { expiresIn: 3600 * 60 }),
      );
    } catch (err) {
      res.status(400).send(err);
    }
  } else if (alreadyCreated) {
    res.send(`User with login '${req.body.login}' already created.`);
  } else {
    res.send(`User with email '${req.body.email}' already created.`);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ where: { login: req.body.login } });
    if (!user) {
      user = await User.findOne({ where: { email: req.body.login } });
      if (!user) {
        res.status(404).send(`Authentication failed. User '${req.body.login}' not found.`);
      }
    }
    user.comparePassword(req.body.password, user.password, (err, isMatch) => {
      if (isMatch && !err) {
        const token = jwt.sign(
          JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
          process.env.secret, { expiresIn: 3600 * 60 },
        );
        res.status(200).send({ success: true, token });
      } else {
        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  list,
  createUser,
  login,
};
