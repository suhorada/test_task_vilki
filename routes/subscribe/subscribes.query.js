/* eslint-disable no-return-await */
const { User, Subscribes } = require('../../models');

const findSubscribers = async (categoryId) => await Subscribes
  .findAll({
    where: { category: categoryId },
    attributes: ['id', 'user', 'category'],
    include: [{ model: User, attributes: ['login'] }],
  });
const userSubscribeExist = async (userId, categoryId) => await Subscribes
  .findOne({ where: { user: userId, category: categoryId } });
const createSubscribe = async (userId, categoryId) => await Subscribes
  .create({ user: userId, category: categoryId });
const removeSubscribe = async (subscribe) => subscribe.destroy();

// findCategory();
module.exports = {
  findSubscribers,
  userSubscribeExist,
  createSubscribe,
  removeSubscribe,
};
