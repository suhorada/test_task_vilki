const { User, Subscribes, Category } = require('../models');

const findSubscribers = async (req, res) => {
  if (!req.query.category) {
    res.status(404).send({ msg: 'Category query not found' });
  }
  try {
    const category = await Category.findOne({ where: { name: req.query.category } });
    const users = await Subscribes.findAll({ where: { category: category.id }, attributes: ['id', 'user', 'category'], include: [{ model: User, attributes: ['login'] }] });
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ err, msg: 'oops' });
  }
};

const createSubscribe = async (req, res) => {
  if (!req.query.category) {
    res.status(404).send({ msg: 'Category query not found' });
  }
  try {
    const category = await Category.findOne({ where: { name: req.query.category } });
    if (!category) {
      res.status(404).send({ msg: `Category '${req.query.category}' not found` });
    }
    const isSubscribed = await Subscribes.findOne({
      where: { user: req.decoded.id, category: category.id },
    });
    if (isSubscribed) {
      res.status(200).send({ msg: `You're already subscribet on category '${req.query.category}'` });
    } else {
      const response = await Subscribes.create({ user: req.decoded.id, category: category.id });
      res.status(201).send(response);
    }
  } catch (err) {
    res.status(400).send({ err, msg: 'oops' });
  }
};

const unsubscribe = async (req, res) => {
  if (!req.query.category) {
    res.status(404).send({ msg: 'Category query not found' });
  }
  try {
    const category = await Category.findOne({ where: { name: req.query.category } });
    if (!category) {
      res.status(404).send({ msg: `Category '${req.query.category}' not found` });
    }
    const sub = await Subscribes.findOne({
      where: { user: req.decoded.id, category: category.id },
    });
    if (sub) {
      await sub.destroy();
      res.status(200).send({ msg: `Subscribe ${sub.id} was removed` });
    } else {
      res.status(400).send({ msg: 'Cant destroy' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: 'oops' });
  }
};

module.exports = {
  findSubscribers,
  createSubscribe,
  unsubscribe,
};
