/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const authenticateMiddleware = (req, res, next) => {
  try {
    const token = req.headers['auth-token'];
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.decoded = decoded;
      next();
    } else {
      return res.status(403).send({
        msg: 'No token provided.',
      });
    }
  } catch (err) {
    return res.status(401).send({ msg: 'Unauthorized access.' });
  }
};

module.exports = {
  authenticateMiddleware,
};
