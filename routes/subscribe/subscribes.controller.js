const { findCategoryByName } = require('../category/category.query');
const { userSubscribeExist, createSubscribe } = require('./subscribes.query');

const subscribe = async (req, res) => {
  try {
    const { category } = req.query;
    const { id } = req.decoded;

    if (!category) {
      res.status(404).send({ msg: 'Category query not found' });
    }

    const categoryExists = await findCategoryByName(category);
    if (!categoryExists) {
      res.status(404).send({ msg: `Category '${category}' not found` });
    }

    const isSubscribed = await userSubscribeExist(id, categoryExists.id);
    if (isSubscribed) {
      res.status(200).send({ msg: `You're already subscribe on category '${category}'` });
    } else {
      const response = await createSubscribe(id, categoryExists.id);
      res.status(201).send(response);
    }
  } catch (err) {
    res.status(400).send({ err, msg: 'oops' });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const { category } = req.query;
    const { id } = req.decoded;

    if (!category) {
      res.status(404).send({ msg: 'Category query not found' });
    }

    const categoryExists = await findCategoryByName(category);
    if (!categoryExists) {
      res.status(404).send({ msg: `Category '${category}' not found` });
    }

    const isSubscribed = await userSubscribeExist(id, categoryExists.id);
    if (isSubscribed) {
      await isSubscribed.destroy();
      res.status(200).send({ msg: `Subscribe ${isSubscribed.id} was removed` });
    } else {
      res.status(400).send({ msg: "Can't destroy" });
    }
  } catch (err) {
    res.status(400).send({ err, msg: 'Bad request' });
  }
};

module.exports = {
  subscribe,
  unsubscribe,
};
