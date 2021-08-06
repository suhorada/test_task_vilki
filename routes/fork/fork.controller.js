const addForMailing = require('../../services/subscribe');
const {
  allForks, allForksInCategory, createFork } = require('./fork.query');
const { findCategoryByName } = require('../category/category.query');
const { findSubscribers } = require('../subscribe/subscribes.query');

const list = async (req, res) => {
  const offset = (Number(req.query.page) - 1) * Number(process.env.PAGE_SIZE);
  const limit = Number(process.env.PAGE_SIZE);
  const { name } = req.body;
  if (!req.query.category) {
    let response;
    try {
      response = await allForks(limit, offset);
    } catch (err) {
      if (typeof offset !== 'number' || typeof limit !== 'number') {
        res.status(400).send({ msg: 'Page not found in query' });
      } else {
        res.status(400).send({ msg: 'Server error', error: err.toString() });
      }
    }
    res.status(200).send(response);
  } else {
    const category = await findCategoryByName(name);
    let response;
    if (category) {
      try {
        response = await allForksInCategory(category.id, limit, offset);
        res.status(200).send(response);
      } catch (err) {
        if (!offset || !limit) {
          res.status(400).send({ msg: 'Page not found in query' });
        } else {
          res.status(400).send({ msg: 'Server error', error: err.toString() });
        }
      }
    } else res.status(404).send(`Category ${req.query.category} not found`);
  }
};

const postFork = async (req, res) => {
  try {
    const { name, year, description } = req.body;
    const { category } = req.query;
    const { id } = req.decoded;
    if (!category) {
      res.status(404).send({ msg: 'Name in query not found' });
    }
    const categoryExist = await findCategoryByName(category);
    if (categoryExist) {
      const response = await createFork({
        user_id: id,
        category_id: categoryExist.id,
        year,
        name,
        description,
      });

      // send notifications
      const items = await findSubscribers(categoryExist.id);
      const users = items.map((el) => el.dataValues.User.dataValues.login);
      addForMailing(categoryExist.name, users);

      res.status(201).send({ msg: 'Fork was created', data: response });
    } else {
      res.status(404).send({ msg: 'Category not found, please, create a category', categoryExist });
    }
  } catch (err) {
    res.status(400).send({ msg: 'Server error', error: err.toString() });
  }
};

module.exports = {
  list,
  postFork,
};
