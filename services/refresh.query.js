/* eslint-disable no-return-await */
const { Refresh } = require('../models');

const createRefresh = async (token) => await Refresh
  .create({ token });

const findToken = async (token) => await Refresh
  .findOne({
    where: { token },
    order: [['createdAt', 'DESC']],
  });

module.exports = {
  createRefresh,
  findToken,
};
