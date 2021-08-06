/* eslint-disable no-return-await */
const { Category } = require('../../models');

const findCategory = async (name) => await Category.findOne({ where: { name } });
const createCategory = async (name, description) => await Category.create(
  { name, description },
);

module.exports = {
  createCategory,
  findCategory,
};
