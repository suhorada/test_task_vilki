/* eslint-disable no-return-await */
const { Op } = require('sequelize');
const { User } = require('../../models');

const findUser = async (string) => await User
  .findOne({ where: { [Op.or]: [{ login: string }, { email: string }] } });

const createUser = async (login, email, password) => await User
  .create({ login, email, password });

module.exports = {
  findUser,
  createUser,
};
