const {
  Fork,
} = require('../../models');

const allForks = (limit, offset) => Fork
  .findAll({ limit, offset });
const createFork = (fork) => Fork
  .create(fork);
const allForksInCategory = (id, limit, offset) => Fork
  .findAll({ where: { category_id: id }, limit, offset });

module.exports = {
  allForks,
  createFork,
  allForksInCategory,
};
