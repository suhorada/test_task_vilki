const { Op } = require('sequelize');
const { User } = require('../../models');

const findUser = (string) => User
  .findOne({ where: { [Op.or]: [{ login: string }, { email: string }] } });

const createUser = (login, email, password) => User
  .create({ login, email, password });

module.exports = {
  findUser,
  createUser,
};
