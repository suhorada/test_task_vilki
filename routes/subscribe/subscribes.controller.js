const { findCategory } = require('../category/category.query');
const { userSubscribeExist, createSubscribe } = require('./subscribes.query');

const subscribe = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { id } = req.decoded;

    if (!categoryId) {
      res.status(404).send({ msg: 'Category param not found' });
    }

    const foundCategory = await findCategory(categoryId);
    if (!foundCategory) {
      res.status(404).send({ msg: `Category '${categoryId}' not found` });
    }

    const isSubscribed = await userSubscribeExist(id, foundCategory.id);
    if (isSubscribed) {
      res.status(200).send({ msg: `You're already subscribe on category '${foundCategory.name}'` });
    } else {
      const response = await createSubscribe(id, foundCategory.id);
      res.status(201).send(response);
    }
  } catch (err) {
    res.status(400).send({ msg: 'Bad request', err });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { id } = req.decoded;

    if (!categoryId) {
      res.status(404).send({ msg: 'Category params not found' });
    }

    const foundCategory = await findCategory(categoryId);
    if (!foundCategory) {
      res.status(404).send({ msg: `Category '${categoryId}' not found` });
    }

    const isSubscribed = await userSubscribeExist(id, foundCategory.id);
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
