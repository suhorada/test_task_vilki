/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const authenticateMiddleware = (req, res, next) => {
  const token = req.headers['jwt-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
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
};

module.exports = {
  authenticateMiddleware,
};
