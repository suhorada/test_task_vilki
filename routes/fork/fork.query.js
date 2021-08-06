/* eslint-disable no-return-await */
const {
  Fork,
} = require('../../models');

const allForks = async (limit, offset) => await Fork
  .findAll({ limit, offset });
const createFork = async (fork) => Fork
  .create(fork);
const allForksInCategory = async (id, limit, offset) => await Fork
  .findAll({ where: { category_id: id }, limit, offset });

module.exports = {
  allForks,
  createFork,
  allForksInCategory,
};
