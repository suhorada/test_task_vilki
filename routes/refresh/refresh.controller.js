const jwt = require('jsonwebtoken');
const { findToken, createRefresh } = require('./refresh.query');

const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;
  let foundToken;
  let newRefreshToken;
  try {
    foundToken = await findToken(refreshToken);
    if (refreshToken && foundToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      await foundToken.destroy();
      newRefreshToken = jwt.sign(
        { id: decoded.id, login: decoded.login },
        process.env.REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_LIFE },
      );
      await createRefresh(newRefreshToken);
      const token = jwt.sign({ id: decoded.id, login: decoded.login }, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE });
      const response = { token, newRefreshToken };
      res.status(200).json(response);
    } else {
      res.status(404).send({ msg: 'Token not found' });
    }
  } catch (err) {
    res.status(400).send({ msg: 'Bad request', err });
  }
};

module.exports = {
  refreshTokens,
};
