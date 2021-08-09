const { User, Subscribes } = require('../../models');

const findSubscribers = (categoryId) => Subscribes
  .findAll({
    where: { category: categoryId },
    attributes: ['id', 'user', 'category'],
    include: [{ model: User, attributes: ['login'] }],
  });
const userSubscribeExist = (userId, categoryId) => Subscribes
  .findOne({ where: { user: userId, category: categoryId } });
const createSubscribe = (userId, categoryId) => Subscribes
  .create({ user: userId, category: categoryId });
const removeSubscribe = (subscribe) => subscribe.destroy();

module.exports = {
  findSubscribers,
  userSubscribeExist,
  createSubscribe,
  removeSubscribe,
};
