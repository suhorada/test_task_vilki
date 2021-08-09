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
    alreadyCreated = responseEmail || responseLogin;

    if (!login || !password || !email) {
      res.status(400).send({ msg: 'Please pass login, email and password.' });
    } else if (!alreadyCreated) {
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
    } else if (alreadyCreated) {
      res.send({ msg: 'User already created.' });
    }
  } catch (err) {
    res.status(400).send({ msg: 'Bad request', err });
  }
};

const signIn = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await findUser(login);
    if (!user) {
      res.status(404).send({ msg: `Authentication failed. User '${login}' not found.` });
    }

    user.comparePassword(password, user.password, async (err, isMatch) => {
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
  const { refreshToken } = req.body;
  let foundToken;
  let newRefreshToken;
  try {
    foundToken = await findToken(refreshToken);
    const user = {};
    if (refreshToken && foundToken) {
      jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
        user.login = decoded.login;
        user.id = decoded.id;
        if (err) {
          res.status(401).json({ msg: 'Unauthorized access.' });
        }
        await foundToken.destroy();
      });
      newRefreshToken = jwt.sign(
        JSON.parse(JSON.stringify({ id: user.id, login: user.login })),
        process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE },
      );
      await createRefresh(newRefreshToken);
      const token = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE });
      const response = { token, newRefreshToken };
      res.status(200).json({ msg: 'Your token was created', response });
    } else {
      res.status(404).send({ msg: 'Invalid request' });
    }
  } catch (err) {
    res.status(400).send({ msg: 'Bad request', err });
  }
};

module.exports = {
  postUser,
  signIn,
  updateToken,
};
