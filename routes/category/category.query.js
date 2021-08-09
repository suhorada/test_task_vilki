const { Category } = require('../../models');

const findCategory = (id) => Category.findOne({ where: { id } });
const createCategory = (name, description) => Category.create(
  { name, description },
);
const findCategoryByName = (name) => Category
  .findOne({ where: { name } });

module.exports = {
  createCategory,
  findCategory,
  findCategoryByName,
};
