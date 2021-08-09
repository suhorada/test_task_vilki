/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { findUser, createUser } = require('./users.query');
const { createRefresh, findToken } = require('../../services/refresh.query');

const postUser = async (req, res) => {
  let responseLogin;
  let responseEmail;
  let alreadyCreated = false;
  const { login, password, email } = req.body;

  try {
    responseEmail = await findUser(email);
    responseLogin = await findUser(login);
  } catch (err) {
    console.log('---------------', responseLogin, responseEmail);
    // console.log('here');
    res.status(400).send({ msg: 'Bad request', err });
  }

  alreadyCreated = responseEmail || responseLogin;

  if (!login || !password || !email) {
    res.status(400).send({ msg: 'Please pass login, email and password.' });
  } else if (!alreadyCreated) {
    try {
      const user = await createUser(login, email, password);

      const token = jwt.sign(
        JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
        process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE },
      );
      const refreshToken = jwt.sign(
        JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
        process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE },
      );

      const resp = { token, refreshToken };
      await createRefresh(refreshToken);
      res.status(201).send({ msg: 'SignUp done', resp });
    } catch (err) {
      res.status(400).send({ msg: 'Bad request', err });
    }
  } else if (alreadyCreated) {
    res.send({ msg: 'User already created.' });
  }
};

const signIn = async (req, res) => {
  try {
    const { login } = req.body;
    const user = await findUser(login);
    if (!user) {
      res.status(404).send({ msg: `Authentication failed. User '${req.body.login}' not found.` });
    }

    // async !!!!
    user.comparePassword(req.body.password, user.password, async (err, isMatch) => {
      if (isMatch && !err) {
        const token = jwt.sign(
          JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
          process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE },
        );
        const refreshToken = jwt.sign(
          JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
          process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE },
        );
        const response = { token, refreshToken };

        await createRefresh(refreshToken);
        res.status(200).send({ msg: 'Login done', response });
      } else {
        res.status(401).send({ msg: 'Authentication failed. Wrong password.' });
      }
    });
  } catch (err) {
    res.status(400).send({ msg: 'Bad request', err });
  }
};

const updateToken = async (req, res) => {
  const { refreshToken, login } = req.body;
  let foundToken;
  try {
    foundToken = await findToken(refreshToken);
  } catch (err) {
    res.status(404).send({ msg: 'token not found', err });
  }
  if ((refreshToken) && (foundToken)) {
    const user = { login };
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: 'Unauthorized access.' });
      }
      user.id = decoded.id;
    });
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE });
    const response = { token };
    res.status(200).json({ msg: 'Your token was created', response });
  } else {
    res.status(404).send({ msg: 'Invalid request' });
  }
};

module.exports = {
  postUser,
  signIn,
  updateToken,
};
