const jwt = require('jsonwebtoken');
const { User, Refresh } = require('../models');

// const tokenList = {};

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
      const token = jwt.sign(
        JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
        process.env.secret, { expiresIn: process.env.tokenLife },
      );
      const refreshToken = jwt.sign(
        JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
        process.env.refreshSecret, { expiresIn: process.env.refreshTokenLife },
      );
      const resp = { success: true, token, refreshToken };
      Refresh.create({ token: refreshToken });
      res.status(201).send(resp);
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
          process.env.secret, { expiresIn: process.env.tokenLife },
        );
        const refreshToken = jwt.sign(
          JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
          process.env.refreshSecret, { expiresIn: process.env.refreshTokenLife },
        );
        Refresh.create({ token: refreshToken });
        const response = { success: true, token, refreshToken };
        res.status(200).send(response);
      } else {
        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const authenticateMiddleware = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['jwt-access-token'];
  if (token) {
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: true, message: 'Unauthorized access.' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    });
  }
  next();
};

// body = {refreshToken, email, login}
const updateToken = async (req, res) => {
  const postData = req.body;
  console.log(postData);
  let foundToken;
  try {
    foundToken = await Refresh.findOne({ where: { token: postData.refreshToken }, order: [['createdAt', 'DESC']] });
  } catch (err) {
    res.status(404).send({ err, msg: 'token not found' });
  }
  if ((postData.refreshToken) && (foundToken)) {
    const user = {
      email: postData.email,
      login: postData.login,
    };
    const token = jwt.sign(user, process.env.secret, { expiresIn: process.env.tokenLife });
    const response = {
      token,
    };
    res.status(200).json(response);
  } else {
    res.status(404).send('Invalid request');
  }
};

module.exports = {
  list,
  createUser,
  login,
  authenticateMiddleware,
  updateToken,
};
