const { Refresh } = require('../../models');

const createRefresh = (token) => Refresh
  .create({ token });

const findToken = (token) => Refresh
  .findOne({
    where: { token },
    order: [['createdAt', 'DESC']],
  });

module.exports = {
  createRefresh,
  findToken,
};
