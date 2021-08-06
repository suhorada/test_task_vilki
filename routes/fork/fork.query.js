/* eslint-disable no-return-await */
const {
  User, Fork, Category, Subscribes,
} = require('../../models');

const allForks = async (limit, offset) => await Fork
  .findAll({ limit, offset });
const allForksInCategory = async (id, limit, offset) => await Fork
  .findAll({ where: { category_id: id }, limit, offset });
const createFork = async (fork) => Fork
  .create(fork);
const findCategoryByName = async (name) => await Category
  .findOne({ where: { name } });
const findSubscribers = async (categoryId) => await Subscribes
  .findAll({
    where: { category: categoryId },
    attributes: ['id', 'user', 'category'],
    include: [{ model: User, attributes: ['login'] }],
  });

module.exports = {
  allForks,
  allForksInCategory,
  findCategoryByName,
  createFork,
  findSubscribers,
};
