/* eslint-disable no-return-await */
const { Category } = require('../../models');

const findCategory = async (name) => await Category.findOne({ where: { name } });
const createCategory = async (name, description) => await Category.create(
  { name, description },
);
const findCategoryByName = async (name) => await Category
  .findOne({ where: { name } });

module.exports = {
  createCategory,
  findCategory,
  findCategoryByName,
};
